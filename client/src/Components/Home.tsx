import { useState, ReactElement, ChangeEvent } from 'react';
import axios from 'axios';
import { Input, Button, SearchBar, SelectedItems, Modal } from './Index';
import '../App.css';

const Home = (): ReactElement => {
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [interests, setInterests] = useState<string>('');
	const [suggestionList, setSuggestionList] = useState<string[]>([]);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalMessage, setModalMessage] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);

	const toggleModal = (): void => {
		setIsModalOpen(!isModalOpen);
	};

	const setModalText = (message: string): void => {
		setModalMessage(message);
	};

	// API call for user specified learning area
	const handleSearch = (): void => {
		axios({
			method: 'GET',
			url: `https://webit-keyword-search.p.rapidapi.com/autosuggest?q=${interests}&language=en`,
			headers: {
				'x-rapidapi-host': ' webit-keyword-search.p.rapidapi.com',
				'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7',
			},
		}).then((res) => {
			const list = res.data.data ? res.data.data.results : [];
			setSuggestionList(list);
		});
	};

	// debouncing the API call
	const debounceApiCall = (() => {
		let debouncing: any = 0;
		return (fn: Function, delay: number): void => {
			debouncing && clearTimeout(debouncing);
			debouncing = setTimeout(() => {
				fn();
			}, delay);
		};
	})();

	// submitting the form
	const handleSubmit = (): boolean => {
		if (!email || !userName || !selectedInterests.length) {
			toggleModal();
			setModalMessage('Please fill all the fields');
			return true;
		}
		axios({
			method: 'POST',
			url: 'https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register',
			data: {
				name: userName,
				email,
				interests: selectedInterests,
			},
			headers: {
				accept: 'success',
				'content-type': 'application/x-www-form-urlencoded',
				'x-rapidapi-host': 'testpostapi1.p.rapidapi.com',
				'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7',
			},
		})
			.then(() => {
				toggleModal();
				setModalMessage('Hurray! You have been enrolled');
				setUserName('');
				setEmail('');
				setInterests('');
				setSelectedInterests([]);
			})
			.catch(() => {
				toggleModal();
				setModalMessage('Something went wrong');
			});
		return false;
	};

	// removing already selected interest area
	const removeSelectedItem = (item: string): void => {
		const index = selectedInterests.indexOf(item);
		const tempArr = selectedInterests;
		tempArr.splice(index, 1);
		setSelectedInterests(tempArr);
		handleSearch();
	};

	return (
		<div className="containerStyle">
			<div className="formTopSpace"></div>
			<h5>Name*</h5>
			<Input
				text={userName}
				placeHolder="Enter your name here..."
				handleChange={(event: ChangeEvent<HTMLInputElement>) => {
					setUserName(event.target.value);
				}}
			/>

			<h5>Email*</h5>
			<Input
				placeHolder="Enter your email here"
				text={email}
				isError={isError}
				handleChange={(event: ChangeEvent<HTMLInputElement>) => {
					setEmail(event.currentTarget.value);
					if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
						setIsError(false);
						return;
					}
					setIsError(true);
				}}
			/>
			<div className="spaceBetweenFormElements" />

			<SelectedItems selectedInterests={selectedInterests} removeSelectedItem={removeSelectedItem} />

			<SearchBar
				text={interests}
				suggestionList={suggestionList}
				setSelectedInterests={setSelectedInterests}
				selectedInterests={selectedInterests}
				toggleModal={toggleModal}
				setModalText={setModalText}
				handleChange={(event: ChangeEvent<HTMLInputElement>) => {
					setInterests(event.target.value);
					debounceApiCall(handleSearch, 1000);
				}}
			/>

			<Modal isModalOpen={isModalOpen} onRequestClose={toggleModal} text={modalMessage} />

			<div className="spaceBetweenFormElements" />
			<Button text="submit" onClick={handleSubmit} />
		</div>
	);
};

export default Home;
