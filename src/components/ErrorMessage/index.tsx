const ErrorMessage = ({message}: {message: string}) => {
    return(
        <div className="text-red-500 text-sm">{message}</div>
    )
}

export default ErrorMessage