import Card from './UI/Card';
import Header from './UI/Header';

import gitIcon from '../assets/icons/github.svg';
import mailIcon from '../assets/icons/email.svg';
import websitelIcon from '../assets/icons/website.svg';

const Footer = () => {
	return (
		<Card className='details__footer-card'>
			<Header className='details__footer-card__header'>
				<p>
					VVScan - 2021 |
					<span>
						<a
							href='mailto:nastia.zhyrnova@gmail.com'
							target='_blank'
							rel='noreferrer'>
							{' '}
							<img src={mailIcon} alt='Email' title='Email' />
						</a>{' '}
						<a
							href='https://nastiazhyrnova.com'
							target='_blank'
							rel='noreferrer'>
							{' '}
							<img src={websitelIcon} alt='Website' title='Website' />
						</a>{' '}
						<a
							href='https://github.com/nastiazhyrnova'
							target='_blank'
							rel='noreferrer'>
							{' '}
							<img src={gitIcon} alt='Github' title='Github' />
						</a>
					</span>
				</p>
			</Header>
		</Card>
	);
};

export default Footer;
