import React, {useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import '../customFilter.css'

const Filters = ({parsedData, setFilteredData}) => {
    
    const [educationType, setEducationType] = useState('');
    const [major, setMajor] = useState('');
    const [state, setState] = useState('');
    const [tuition, setTuition] = useState({min: 0, max: 100000});
    const [costLiving, setCostLiving] = useState({min: 85, max: 180});
    const [roi, setROI] = useState({min: 0, max: 1200});

    const majors = ['Engineering', 'Computer Science', 'Biology', 'Business', 'Art', 'Marketing'];

    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    const handleApplyFilters = () => {
        const filtered = parsedData.filter(item => {
          return (
            (educationType === '' || item["Type"] === (educationType)) &&
            (major === '' || item["Major"].includes(major)) &&
            (state === '' || item["State"] === (state)) &&
            (parseInt(item["In-state Tuition"].replace(/[^0-9.-]+/g,"")) <= (tuition.max) && parseInt(item["In-state Tuition"].replace(/[^0-9.-]+/g,"")) >= (tuition.min)) &&
            (parseInt(item["Cost of Living Index"].replace(/[^0-9.-]+/g,"")) <= (costLiving.max) && parseInt(item["Cost of Living Index"].replace(/[^0-9.-]+/g,"")) >= (costLiving.min)) &&
            (parseInt(item["In-state ROI"].replace(/[^0-9.-]+/g,"")) <= (roi.max) && parseInt(item["In-state ROI"].replace(/[^0-9.-]+/g,"")) >= (roi.min))
          );
        });
        setFilteredData(filtered);
    };

    return(
        <div id="filters">
            <h1>Tell Us About Your Preferences</h1>
            <p>Fill out the fields below to receive your free return-on-investment calculations
                for educational opportunities around United States. Leave the field blank to view all
                available options.
            </p>
            {/* Filter Program Type */}
            <select value={educationType} onChange={(e) => setEducationType(e.target.value)}>
                <option value="">Select Program Type</option>
                <option value="Public 2-year">Public 2-year</option>
                <option value="Public 4-year">Public 4-year</option>
                <option value="Private 2-year">Private 2-year</option>
                <option value="Private 4-year">Private 4-year</option>
                <option value="For-profit 2-year">For-profit 2-year</option>
                <option value="For-profit 4-year">For-profit 4-year</option>
            </select>
            {/* Filter Major */}
            <select value={major} onChange={(e) => setMajor(e.target.value)}>
                <option value="">Select Major</option>
                    {majors.map((majorOption, index) => (
                        <option key={index} value={majorOption}>
                        {majorOption}
                        </option>
                    ))}
            </select>
            {/* Filter State */}
            <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                    {states.map((stateOption, index) => (
                        <option key={index} value={stateOption}>
                        {stateOption}
                        </option>
                    ))}
            </select>
            {/* Filter Tuition */}
            <InputRange maxValue={100000}
                        minValue={0}
                        value={tuition}
                        allowSameValues
                        formatLabel={(value) => `$${value}`}
                        onChange={(value) => setTuition(value)}>       
            </InputRange>
            <input
                type="number"
                value={tuition.min}
                onChange={(e) => setTuition({ ...tuition, min: e.target.value })}
            />
            <input
                type="number"
                value={tuition.max}
                onChange={(e) => setTuition({ ...tuition, max: e.target.value })}
            />
            {/* Filter Cost of Living */}
            <InputRange maxValue={180}
                        minValue={85}
                        value={costLiving}
                        allowSameValues
                        onChange={(value) => setCostLiving(value)}>       
            </InputRange>
            <input
                type="number"
                value={costLiving.min}
                onChange={(e) => setCostLiving({ ...costLiving, min: e.target.value })}
            />
            <input
                type="number"
                value={costLiving.max}
                onChange={(e) => setCostLiving({ ...costLiving, max: e.target.value })}
            />
            {/* Filter ROI */}
            <InputRange maxValue={1200}
                        minValue={0}
                        value={roi}
                        allowSameValues
                        onChange={(value) => setROI(value)}>       
            </InputRange>
            <input
                type="number"
                value={roi.min}
                onChange={(e) => setROI({ ...roi, min: e.target.value })}
            />
            <input
                type="number"
                value={roi.max}
                onChange={(e) => setROI({ ...roi, max: e.target.value })}
            />
            <button onClick={handleApplyFilters}>Apply Filters</button>
        </div>
    );
}

export default Filters;