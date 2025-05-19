import React from "react";

const Inductor = ({
    // color = "black",
    height = 32,
}: {
    color?: string;
    height?: number;
}) => {
    // const cls = {
    //     strokeWidth: "1.5px",
    //     stroke: color,
    // } satisfies React.CSSProperties;

    // const cls1 = {
    //     ...cls,
    //     fill: "none",
    //     strokeLinecap: "round",
    // } satisfies React.CSSProperties;

    // const cls2 = {
    //     ...cls,
    //     strokeLinecap: "square",
    //     strokeLinejoin: "round",
    //     fill: "none",
    // } satisfies React.CSSProperties;

    return (
        <svg
            fill="#000000"
            viewBox="3 10 30 16"
            height={height}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <title>inductor-line</title>{" "}
                <path
                    d="M24.31,25.81c-1.75,0-3-2.49-3-6a12.79,12.79,0,0,1,1.72-6.7,2.57,2.57,0,0,0-3.79,0A12.79,12.79,0,0,1,21,19.76c0,3.56-1.23,6-3,6s-3-2.49-3-6a12.79,12.79,0,0,1,1.72-6.7,2.57,2.57,0,0,0-3.79,0,12.79,12.79,0,0,1,1.72,6.7c0,3.56-1.23,6-3,6s-3-2.49-3-6a12.88,12.88,0,0,1,1.71-6.7,2.7,2.7,0,0,0-1.89-.87C7.1,12.19,5.69,13.7,5,16l-.23.7H2a1,1,0,0,1,0-2H3.29c1.1-2.83,3.06-4.55,5.24-4.55a4.67,4.67,0,0,1,3.16,1.32,4.62,4.62,0,0,1,3.15-1.32A4.65,4.65,0,0,1,18,11.51a4.43,4.43,0,0,1,6.31,0,4.67,4.67,0,0,1,3.16-1.32c2.18,0,4.14,1.72,5.24,4.55H34a1,1,0,0,1,0,2H31.28l-.23-.7c-.74-2.34-2.15-3.85-3.58-3.85a2.7,2.7,0,0,0-1.89.87,12.88,12.88,0,0,1,1.71,6.7C27.29,23.32,26.07,25.81,24.31,25.81ZM18,14.93a11.71,11.71,0,0,0-1,4.83c0,2.54.66,3.75,1,4,.32-.27,1-1.48,1-4A11.71,11.71,0,0,0,18,14.93Zm6.31,0a11.71,11.71,0,0,0-1,4.83c0,2.54.66,3.75,1,4,.32-.27,1-1.48,1-4A11.71,11.71,0,0,0,24.31,14.93Zm-12.62,0a11.71,11.71,0,0,0-1,4.83c0,2.54.66,3.75,1,4,.32-.27,1-1.48,1-4A11.71,11.71,0,0,0,11.69,14.93Z"
                    className="clr-i-outline clr-i-outline-path-1"
                ></path>{" "}
            </g>
        </svg>
        // <svg
        //   height={height}
        //   xmlns="http://www.w3.org/2000/svg"
        //   viewBox="0 0 66.5 17.5"
        // >
        //   <g id="Layer_2" data-name="Layer 2">
        //     <g id="svg8">
        //       <g id="g1092">
        //         <path id="path918" style={cls1} d="M1.75,8.75h14" />
        //         <path id="path920" style={cls1} d="M50.75,8.75h14" />
        //         <rect
        //           id="rect922"
        //           style={cls2}
        //           x="15.75"
        //           y="1.75"
        //           width="35"
        //           height="14"
        //         />
        //       </g>
        //     </g>
        //   </g>
        // </svg>
    );
};

export default Inductor;
