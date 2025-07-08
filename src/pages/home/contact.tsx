const Contact = () => {
  return (
    <div className="fixed bottom-0 left-0 z-0 h-full w-full bg-[#333333] p-5">
      <div className="h-full w-full rounded-lg bg-white p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Contact</h1>
            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md p-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md p-2"
              />
              <textarea
                placeholder="Message"
                className="w-full rounded-md p-2"
              />
              <button className="w-full rounded-md bg-blue-500 p-2 text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
