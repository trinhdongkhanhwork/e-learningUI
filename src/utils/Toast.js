import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

toast.TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
}

toast.DEFAULTS = {
    position: "top-right",
    duration: 5000,
    isClosable: true,
}

toast.success = (message) => {
    toast(message, { type: toast.TYPE.SUCCESS });
}

toast.error = (message) => {
    toast(message, { type: toast.TYPE.ERROR });
}

toast.warning = (message) => {
    toast(message, { type: toast.TYPE.WARNING });
}

toast.info = (message) => {
    toast(message, { type: toast.TYPE.INFO });
}

export default toast;


