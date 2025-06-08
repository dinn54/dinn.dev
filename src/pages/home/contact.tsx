const Contact = () =>{
	return (
		<div className="fixed bottom-0 left-0 w-full h-full bg-[#333333] p-5 z-0">
			<div className="h-full w-full bg-white rounded-lg p-5">
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-2xl font-bold">Contact</h1>
						<div className="flex flex-col items-center justify-center">
							<input type="text" placeholder="Name" className="w-full p-2 rounded-md" />
							<input type="email" placeholder="Email" className="w-full p-2 rounded-md" />
							<textarea placeholder="Message" className="w-full p-2 rounded-md" />
							<button className="w-full p-2 rounded-md bg-blue-500 text-white">Send</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Contact;