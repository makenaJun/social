import React, { FC } from 'react';
import mStyle from './FormsControls.module.css'
import cn from 'classnames'
import { WrappedFieldProps } from 'redux-form';

const FormControls: FC<WrappedFieldProps> = (props) => {
    const { input, meta, children} = props;
    const hasError = meta.touched && meta.error;
    return (
        <div className={cn(mStyle.formControl, {[mStyle.error]: hasError})} >
            <div>
                {children}
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>;
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>;
}