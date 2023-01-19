import {toast} from "react-toastify";
import React from "react";

export const errorToast = (title, description) => {
    toast.error(<>
        <p>{title}</p>
        {description ? <p>{description}</p> : ''}
    </>);
}

export const successToast = (title, description) => {
    toast.success(<>
        <p>{title}</p>
        {description ? <p>{description}</p> : ''}
    </>);
}