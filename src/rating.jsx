import React from 'react';
import PropTypes from 'prop-types';

//Material components
import Grid from '@material-ui/core/Grid';

//SVG
import Star from './utils/star';

//Utility
import compute from './utils/compute';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		'& > div.MuiGrid-item': {
			margin: '0px 3px',
		}
	},
	starContainer: {
		cursor: 'pointer',
		'&:hover ~ div.MuiGrid-item > p.rate-num': {
			color: '#00CBFF',
		}
	},
	star: {
		height: 20,
		width: 20,
	},
	bigStar: {
		height: 25,
		width: 25,
	},
	full: {
		'& > path': {
			fill: 'gold',
		}
	},
	half25: {
		'& > path': {
			fill: 'url(#half-25)',
		}
	},
	half50: {
		'& > path': {
			fill: 'url(#half-50)',
		}
	},
	half75: {
		'& > path': {
			fill: 'url(#half-75)',
		}
	},
	half100: {
		'& > path': {
			fill: 'url(#half-100)',
		}
	},
	interactive: {
		cursor: 'pointer',
	},
	rateNum: {
		fontSize: '1.2rem',
		margin: 0,
		cursor: 'pointer',
		'&:hover': {
			color: '#00CBFF',
		}
	}
}));

const Rating = (props) => {
	const classes = useStyle();
	//Get props
	const {isView, isBig, handleOpen, handleRate, value, interactive, reviews} = props;

	const rating = value || 0;

	//Separate whole number part and decimal part
	const rDown = Math.floor(rating);
	const deci = rating-rDown;

	const offset = deci * 100;

	const handleHover = (rateValue) => {
		if (interactive && handleRate) handleRate(rateValue);
	}
	
	const stars = new Array(5).fill(1).map((item, index) => {
		const add = (index < rDown) ?classes.full :"";
		const half = (deci && index === rDown) ?compute(offset, classes) :"";
		return <Grid item key={index} className={isView ?classes.starContainer :""} onClick={handleOpen} onMouseOver={handleHover.bind(Rating, index+1)} >
			<Star 
				viewBox="0 0 28 26" 
				className={[
					isBig ?classes.bigStar :classes.star,  
					interactive ?classes.interactive :"", 
					add, 
					half
				].join(' ')} 
			/>
		</Grid>
	});

	return (
		<Grid item className={classes.root}>
			{stars}
			{isView
				?<Grid item>
					<p className={[classes.rateNum, "rate-num"].join(' ')} onClick={handleOpen}> ({reviews}) </p>
				</Grid>
				:""
			}
		</Grid>
	);
}

Rating.propTypes = {
	isBig: PropTypes.bool,
	interactive: function (props, propName) {
		if (!!props['handleRate'] && (typeof(props[propName]) === 'undefined' || !props[propName] || typeof(props[propName]) !== 'boolean'))
			return new Error("Component should be interactive, for the handleRate to take effect!");
		if (typeof(props[propName]) !== 'undefined' && typeof(props[propName]) !== 'boolean')
			return new Error("interactive should be a boolean!");
	},
	handlRate: function (props, propName) {
		if (props['interactive'] === true && (typeof(props[propName]) === 'undefined' || typeof(props[propName]) !== 'function')) 
			return new Error("Please provide a handleRate function!");
		if (!!props[propName] && typeof(props[propName]) !== 'function')
			return new Error("handleRate should be a function!");
	},
	value: PropTypes.number
}

export default Rating;