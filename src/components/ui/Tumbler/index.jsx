import React, { useState, useEffect } from 'react';
import './styles.scss';

export default function Tumbler({ active, action }) {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(!active);


	const onChangeHandler = () => {
    setDisabled(true)
    action().then(()=> {
      setChecked(!checked)
      setDisabled(false)
    })
	};

	return (
		<div className='button b2' id='button-18'>
				<input
        disabled={disabled}
          checked={checked}
					onChange={onChangeHandler}
					type='checkbox'
					className='checkbox'
				/>
			
			<div className='knobs'>
				<span></span>
			</div>
			<div className='layer'></div>
		</div>
	);
}
