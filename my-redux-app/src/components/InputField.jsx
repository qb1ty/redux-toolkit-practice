const InputField = ({ value, handleChange, addTask }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask()
    }

    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <div className="flex justify-between items-center gap-5">
                    <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} type="text" className="border border-slate-300 outline-none text-lg py-1 px-3" />
                    <button onClick={() => addTask()} type="button" className="bg-slate-300 outline-none text-lg py-1 px-4">Добавить</button>
                </div>
            </div>
        </>
    )
}

export default InputField