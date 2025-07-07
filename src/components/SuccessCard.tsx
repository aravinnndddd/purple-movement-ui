
type SuccessCardProps = {
    title: string | undefined;
    message: string | undefined;
    onClose: () => void; // Callback to close the popup
    isOpen: boolean
};


const SuccessCard = ({ title, message, onClose, isOpen }: SuccessCardProps) => {
    if (!isOpen) {
        return null;
    }
    return (

        <div className="absolute top-24 md:left-[30rem]  md:right-[35rem] mt-8 mx-4 md:mx-0 bg-[url('../src/assets/images/ptm.jpg')] bg-cover bg-center border shadow-lg rounded-xl p-4 z-10 h-48 w-74 md:w-1/3 bg-black z-10">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" aria-label="Close" onClick={onClose} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                    <path fillRule="evenodd" d="M10 8.586L15.657 2.93a1 1 0 111.414 1.414L11.414 10l5.657 5.657a1 1 0 01-1.414 1.414L10 11.414l-5.657 5.657a1 1 0 01-1.414-1.414L8.586 10 2.93 4.343a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
                </svg>
            </button>
            <h2 className="text-xl md:text-3xl font-bold mb-4 flex justify-center">{title}</h2>
            <p className="text-gray-300 mb-6 md:text-xl flex justify-center">{message}</p>
        </div>

    );
}


export default SuccessCard;