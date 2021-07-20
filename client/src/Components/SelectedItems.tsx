import { ReactElement } from 'react';
import '../App.css';

type Props = {
	selectedInterests: Array<string>;
	removeSelectedItem: Function;
};

const SelectedItems = (props: Props): ReactElement => {
	const { selectedInterests, removeSelectedItem } = props;

	return (
		<div className="interestsContainer">
			{selectedInterests.map((item: string) => {
				return (
					<div
						className="interestTextStyle"
						key={item}
						onClick={() => {
							removeSelectedItem(item);
						}}
					>
						<p className="interestTextSpacing">{item}</p>
						<span className="material-icons md-24">highlight_off</span>
					</div>
				);
			})}
		</div>
	);
};

export default SelectedItems;
