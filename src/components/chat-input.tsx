'use client';

interface ChatInputProps {
  handleSubmit: () => void;
  handleInputChange: any;
  input: any;
}

export default function ChatInput({
  handleSubmit,
  handleInputChange,
  input
}: ChatInputProps) {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-indigo-200'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-between w-full md:w-[768px] md:mx-auto'
      >
        <textarea
          rows={1}
          contentEditable
          name='prompt'
          placeholder='Ask me something about Ghana'
          className='chatinput'
          value={input}
          onChange={handleInputChange}
        />
        <button type='submit' className='m-2'>
          Send
        </button>
      </form>
    </div>
  );
}
