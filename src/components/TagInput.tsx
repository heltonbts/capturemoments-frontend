import { useState, type Dispatch, type SetStateAction } from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdAdd, MdClose } from 'react-icons/md'

type Props = {
  tag: string[]
  setTag: Dispatch<SetStateAction<string[]>>
}
const TagInput = ({ tag, setTag }: Props) => {
  const [input, setInput] = useState<string>('')

  const addNewTag = () => {
    const value = input.trim()

    if (value !== '') {
      setTag([...tag, value])
      setInput('')
    }
  }

  const handleRemoveTag = (removeTag: string) => {
    setTag(tag.filter((t) => t !== removeTag))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addNewTag()
    }
  }

  return (
    <div>
      {tag.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {tag.map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-2 rounded bg-violet-200/40 px-3 py-1 text-violet-600"
            >
              <GrMapLocation /> {item}
              <button onClick={() => handleRemoveTag(item)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center gap-4">
        <input
          type="text"
          className="rounded border bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Adicionar localização"
          value={input}
          onChange={({ target }) => {
            setInput(target.value)
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex h-8 w-8 items-center justify-center rounded border border-violet-500 hover:bg-violet-500"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-purple-500 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export default TagInput
