import { useChat } from 'ai/react';

export default function ChatInput() {
  const { handleInputChange, handleSubmit, input } = useChat({
    credentials: 'include'
  });

  return (
    <div className='fixed bottom-0 w-full'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-between bg-indigo-200'
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
