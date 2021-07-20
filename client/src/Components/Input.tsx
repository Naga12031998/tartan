import { ChangeEventHandler, ReactElement } from 'react';

type Props = {
	handleChange: ChangeEventHandler<HTMLInputElement>;
	text: string;
	placeHolder: string;
	// optional props
	isError?: boolean;
};

const Input = (props: Props): ReactElement => {
	// extracting data  from props
	const { handleChange, text, placeHolder, isError } = props;

	return (
		<>
			<input className="textFieldStyle" placeholder={`${placeHolder}...`} value={text} onChange={handleChange} />
			{isError ? <label className="labelStyle">Incorrect email</label> : <></>}
		</>
	);
};

export default Input;
