
import React from 'react';
export default function Button({ children, variant='primary', size='md', className='', disabled, ...rest }){
  const cls = `btn ${disabled ? 'btn-disabled' : `btn-${variant}`} btn-${size} ${className}`.trim();
  return <button className={cls} disabled={disabled} {...rest}>{children}</button>;
}
