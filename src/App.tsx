import React, {useState} from 'react';
import dataJson from './formData.json';
import './style.css'

interface FormField {
    default_value?: string | number | boolean;
    value?: string | number | boolean;
    validation?: string;
    min_value?: number;
    max_value?: number;
    options?: (string | number)[];
    type: 'text' | 'longtext' | 'dropdown' | 'number';
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false); // State to track form submission

    const jsonFormData: FormField[] = dataJson;


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const renderFormFields = (fields: FormField[]) => {
        return fields.map((field, index) => {
            let { type, value, validation, options, min_value, max_value, default_value } = field;
            validation = validation?.length == 0 ? undefined : validation;
            return (
                <div key={index}>
                    <label>{type}:</label>
                    {type === 'text' && (
                        <input
                            type="text"
                            value={formData[type] || ''}
                            onChange={(e) => setFormData({ ...formData, [type]: e.target.value })}
                            pattern={validation}
                        />
                    )}
                    {type === 'number' && (
                        <input
                            type="number"
                            value={formData[type] || ''}
                            onChange={(e) => setFormData({ ...formData, [type]: e.target.value })}
                            min={min_value}
                            max={max_value}
                        />
                    )}
                    {type === 'dropdown' && (
                        <select
                            value={formData[type] || default_value}
                            onChange={(e) => setFormData({ ...formData, [type]: e.target.value })}
                        >
                            {options?.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                    {type === 'longtext' && (
                        <textarea
                            value={formData[type] || ''}
                            onChange={(e) => setFormData({ ...formData, [type]: e.target.value })}
                            pattern={validation}
                        />
                    )}
                </div>
            );
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {renderFormFields(jsonFormData)}
                <button type="submit">Submit</button>
            </form>
            {submitted && (
                <div>
                    <h2>Submitted Form Data:</h2>
                    <ul>
                        {Object.keys(formData).map((fieldName) => (
                            <li key={fieldName}>
                                <strong>Field Name:</strong> {fieldName}
                                <br />
                                <strong>Value:</strong> {formData[fieldName]}
                                <br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Form;
