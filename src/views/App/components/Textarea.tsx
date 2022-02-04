type Props = {
    value?: string
    onChange?: (content: string) => void
}

const Textarea = (props : Props) => {
    return(
        <textarea 
            className="w-full h-full outline-none resize-none rounded-xl p-5 bg-zinc-800 border-2 shadow-xl text-white"
            value={props.value}
            onChange={e => props.onChange && props.onChange(e.currentTarget.value)}
        />
    )
}

export default Textarea