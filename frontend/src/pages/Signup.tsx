
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button, ButtonWarning, Heading, InputBox, SubHeading } from "../components/Little-comp";

function SignUp(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="flex justify-center bg-zinc-500 bg-auto h-screen">
      <div className="flex flex-col rounded-lg bg-white mb-auto mt-auto shadow-lg shadow-black pt-7 pb-7 w-80 gap-4 pl-5 pr-5">
        <div className="flex gap-2 flex-col">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
        </div>

        <InputBox
          type={"text"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Full name"}
          placeholder={"Enter Full name here"}
        />

        <InputBox
          type={"email"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          label={"Email"}
          placeholder={"Enter e-mail here"}
        />

        <InputBox
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"Enter password here"}
        />

        <div>
          <Button
            onClick={async () => {
              if (email && username && password) {
                try {
                  await axios
                    .post("http://localhost:8787/api/v1/user/signup", {
                      username: username,
                      password: password,
                      email: email,
                    })
                    .then(function (res) {
                      localStorage.setItem("token", `Bearer ${res.data.token}`);
                      localStorage.setItem("User", JSON.stringify(res.data.user))
                      navigate("/dashboard");
                    })
                    .catch(function () {
                      alert(
                        "Error 400:Invalid UserName/Password or Email already exist"
                      );
                    });
                } catch (error) {
                  alert(
                    "Error 400:Invalid UserName/Password or Email already exist"
                  );
                }
              } else {
                alert("fill all the input box");
              }
            }}
            label={"Sign Up"}
          />
          <ButtonWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
