// import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkInUser, checkUser } from "../zod/user";
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";

enum StatusCode {
  BADREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSIOON = 403,
}

// this controller controll signup request
export async function handleSignupPostreq(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      username: string;
      email: string;
      password: string;
    } = await c.req.json();

    console.log(body);

    const check = checkUser.safeParse(body);

    if (!check.success) {
      return c.body(
        "input are invalid pls enter valid info",
        StatusCode.BADREQ
      );
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (isUserExist) {
      return c.body("email already exist", StatusCode.BADREQ);
    }

    const res = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const userId = res.id;

    const token = await Jwt.sign(userId, c.env.JWT_TOKEN);

    return c.json({
      msg: "User created successfully",
      token: token,
      user: {
        userId: res.id,
        username: res.username,
        email: res.email,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller control signin request
export async function handleSigninPostreq(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      email: string;
      password: string;
    } = await c.req.json();

    const check = checkInUser.safeParse(body);

    if (!check.success) {
      return c.body(
        "input are invalid pls enter valid info",
        StatusCode.BADREQ
      );
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (isUserExist == null) {
      return c.body("user doesn't exist pls signup first", StatusCode.BADREQ);
    }

    const userId = isUserExist.id;

    const token = await Jwt.sign(userId, c.env.JWT_TOKEN);

    return c.json({
      message: "User logged-In successfully",
      token: token,
      user: {
        userId: userId,
        username: isUserExist.username,
        email: isUserExist.email,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller send all the posts
export async function handlegetPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const resp = await prisma.posts.findMany({
      include: {
        tags: true,
        User: true,
      },
    });
    return c.json({
      post: resp.map((res) => ({
        id: res.id,
        username: res.User.username,
        userId: res.User.id,
        title: res.title,
        body: res.body,
        tags: res.tags,
        createdAt: res.createdAt,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

//this controller send only user posts
export async function handlegetMainUserPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const resp = await prisma.posts.findMany({
      where: {
        userId: c.get("userId"),
      },
    });
    return c.json({
      post: resp,
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller create new post
export async function handlePostPostreq(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();

    const tagNames = body.tags.split(",").map((tag) => tag.trim());

    if ((body.body && body.title) == null) {
      return c.body("title and body should not be blank", StatusCode.BADREQ);
    }
    const res = await prisma.posts.create({
      data: {
        title: body.title,
        body: body.body,
        userId: c.get("userId"),
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      message: "Post successfully",
      post: {
        id: res.id,
        title: res.title,
        body: res.body,
        tags: res.tags.map((tag) => tag.tag),
        createdAt: res.createdAt,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller send the specific post
export async function handleGetPostById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
      include: {
        tags: true,
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }
    return c.json({
      data: {
        id: isPostExist.id,
        title: isPostExist.title,
        body: isPostExist.body,
        tags: isPostExist.tags,
        createdAt: isPostExist.createdAt,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller update the specific post
export async function handlePutById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = Number(c.req.param("id"));

    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();

    const tagNames = body.tags.split(",").map((tag) => tag.trim());

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.update({
      where: {
        id: id,
        userId: c.get("userId"),
      },
      data: {
        title: body.title,
        body: body.body,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      data: {
        id: res.id,
        title: res.title,
        body: res.body,
        tags: res.tags,
        createdAt: res.createdAt,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller delete the specific post
export async function handlePostDeleteById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.delete({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });
    return c.json({
      message: "post deleted",
    });
  } catch (error) {
    return c.json({ msg: `Internal server error: ${error}` }, 500);
  }
}

// to get user by Id

export async function handlegetUserById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findFirst({
      where: {
        id: Number(c.req.param("id")),
      },
      include: {
        posts: true,
      },
    });

    if (res == null) {
      return c.body("user not found", 404);
    } else {
      return c.json({
        user: {
          id: res.id,
          username: res.username,
          email: res.email,
          posts: res.posts,
        },
      });
    }
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

//to get all user
export const handlegetAllUsers = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findMany();
    return c.json({
      users: res.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
};

//get all tagnames
export const handleGetTags = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.tags.findMany();

    return c.json({
      tags: res,
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
};

//get all post by tagname
export const handlePostsByTags = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.tags.findMany({
      where: {
        tag: String(c.req.param("tag")),
      },
      select: {
        post: {
          select: { 
            User: { select: { username: true } },
            id: true,
            userId: true,
            title:true,
            body: true,
            createdAt: true
          },
          
        },
      },
    });

    return c.json({
       posts: res[0].post.map(post=>({
        username: post.User.username,
        id: post.id,
        title: post.title,
        userId: post.userId,
        body: post.body,
        createdAt: post.createdAt
       }))
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
};
