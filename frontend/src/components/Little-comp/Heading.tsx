interface HeadingProp {
    label: string;
}

function Heading({label}:HeadingProp) {
    return <div className="text-3xl font-black text-black text-center">{label}</div>;
}

export default Heading;