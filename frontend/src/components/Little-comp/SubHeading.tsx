interface SubHeadingProp {
    label: string;
}


function SubHeading({label}:SubHeadingProp) {
    return <div className="text-center pl-5 pr-5 text-xs">{label}</div>;
}

export default SubHeading;