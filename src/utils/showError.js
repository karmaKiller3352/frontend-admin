import Swal from 'sweetalert2';

const showError = (error) => {
	Swal.fire({
		title: 'Oops',
		text: error,
		confirmButtonText: 'Ok',
		icon: 'error',
	});
};

export default showError;
