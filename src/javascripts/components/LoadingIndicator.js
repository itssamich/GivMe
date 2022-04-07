import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";

export default function() {
    const {loading} = usePromiseTracker();
}