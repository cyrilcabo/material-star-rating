# Material Star Rating

## Installation

* Run `npm install material-star-rating` in your project.
* Import in your project using `import Rating from 'material-star-rating';`

## Usage

`<Rating {...props} />`

## Props

* **isBig** (`optional` **|** `boolean` **|** `default:false`) - changes the size of the stars
* **interactive** (`optional` **|** `boolean` **|** `default:false`) - makes the stars interactive
* **handleRate** (`optional, required if interactive` **|** `function` **|** `default:null`) - handles the rating if the stars are interactive
* **value** (`optional` **|** `number` **|** `default:0`) - the number of filled stars (can have decimal numbers)

## Sample Usage
```JSX
import React from 'react';
import Rating from 'material-star-rating;


const Component = () => {
	const [rating, setRating] = React.useState(1);
	const handleRate = (val) => setRating(val);
	
	return <Rating interactive handleRate={handleRate} value={rating} isBig />
}


export default Component;
```

## Demo
![Live demo](https://drive.google.com/uc?export=view&id=1Q9xJ7_-KJ-vRhnVByTrfTH8tF-hyr-tk)