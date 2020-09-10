import Swal from 'sweetalert2';

const showError = (error) => {
	Swal.fire({
		title: 'Oops',
		text: error,
		confirmButtonText: 'Ok',
		icon: 'error',
	});
	throw new Error(error);
};

export default showError;
