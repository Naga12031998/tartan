import { ChangeEventHandler, useEffect, useRef, ReactElement, MutableRefObject } from 'react';
import Input from './Input';
import '../App.css';

type Props = {
	handleChange: ChangeEventHandler<HTMLInputElement>;
	text: string;
	suggestionList: Array<string>;
	selectedInterests: Array<string>;
	toggleModal: Function;
	setModalText: Function;
	setSelectedInterests: Function;
};

const SearchBar = (props: Props): ReactElement => {
	const { handleChange, text, suggestionList, setSelectedInterests, selectedInterests, toggleModal, setModalText } =
		props;
	const dropDownRef = useRef() as MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		// clean up function
		return () => {
			document.addEventListener('mousedown', handleClickOutside);
		};
	});

	// hiding dropdown list
	const handleClickOutside = (event: any): void => {
		if (dropDownRef && !dropDownRef.current.contains(event.target)) {
			hideList();
		}
	};

	const hideList = (): void => {
		dropDownRef.current.style.display = 'none';
	};

	return (
		<div className="dropDownContainerStyle">
			<h5>Please select your interest areas*</h5>
			<Input handleChange={handleChange} text={text} placeHolder="Search" />
			<div
				ref={dropDownRef}
				className="dropDownStyle"
				style={{
					display: suggestionList.length ? 'block' : 'none',
				}}
			>
				{suggestionList.map((item: string) => {
					return (
						<div key={item} className="listItems">
							<p
								className="dropDownTextStyle"
								onClick={(): void => {
									if (selectedInterests.length === 3) {
										toggleModal();
										hideList();
										setModalText('You can choose only three interest areas');
										return;
									}
									setSelectedInterests([...selectedInterests, item]);
								}}
							>
								{item}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SearchBar;
