import React, {useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../customFilter.css';
import Select from 'react-select';

const Filters = ({parsedData, setFilteredData, setClicked}) => {
    
    const [educationType, setEducationType] = useState('Show All');
    const [major, setMajor] = useState('Show All');
    const [state, setState] = useState('Show All');
    const [tuition, setTuition] = useState({min: 21000, max: 90000});
    const [costLiving, setCostLiving] = useState({min: 85, max: 180});
    const [roi, setROI] = useState({min: 460, max: 1100});
    const [salary, setSalary] = useState({min: 50000, max: 230000});

    const types = [
        { value: 'Show All', label: 'Show All' },
        { value: 'Public 2-year', label: 'Public 2-year' },
        { value: 'Public 4-year', label: 'Public 4-year' },
        { value: 'Private 2-year', label: 'Private 2-year' },
        { value: 'Private 4-year', label: 'Private 4-year' },
        { value: 'For-profit 2-year', label: 'For-profit 2-year' },
        { value: 'For-profit 4-year', label: 'For-profit 4-year' }];

    const majors = ['Show All', 'Engineering', 'Computer Science', 'Biology', 'Business', 'Art', 'Marketing'];

    const states = [
        'Show All', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    const handleApplyFilters = () => {
        const filtered = parsedData.filter(item => {
          return (
            (educationType === 'Show All' || item["Type"] === (educationType)) &&
            (major === 'Show All' || item["Major"].includes(major)) &&
            (state === 'Show All' || item["State"] === (state)) &&
            (parseInt(item["In-state Tuition"].replace(/[^0-9.-]+/g,"")) <= (tuition.max) && parseInt(item["In-state Tuition"].replace(/[^0-9.-]+/g,"")) >= (tuition.min)) &&
            (parseInt(item["Cost of Living Index"].replace(/[^0-9.-]+/g,"")) <= (costLiving.max) && parseInt(item["Cost of Living Index"].replace(/[^0-9.-]+/g,"")) >= (costLiving.min)) &&
            (parseInt(item["In-state ROI"].replace(/[^0-9.-]+/g,"")) <= (roi.max) && parseInt(item["In-state ROI"].replace(/[^0-9.-]+/g,"")) >= (roi.min)) &&
            (parseInt(item["Average Salary"].replace(/[^0-9.-]+/g,"")) <= (salary.max) && parseInt(item["Average Salary"].replace(/[^0-9.-]+/g,"")) >= (salary.min))
          );
        });
        setClicked(true);
        setFilteredData(filtered);
    };

    return(
        <div id="filters">
            <h1>Tell Us About Your Preferences</h1>
            <h2>Fill out the fields below to receive your free return-on-investment calculations
                for educational opportunities around United States. Press filter button to view 
                your personalized results.
            </h2>
            <hr className="solid"></hr>
            {/* Filter Program Type */}
            <div id="col">
                <div id="drops">
                    <div className="filter">
                        <h3>Program Type</h3>
                        <Select className="select"
                            isSearchable = {true} maxMenuHeight={150}
                            value={{ value: educationType, label: educationType }}
                            onChange={(selectedOption) => setEducationType(selectedOption.value)}
                            options={types}
                        />
                    </div>
                    {/* Filter Major */}
                    <div className="filter">
                        <h3>Major</h3>
                        <Select
                            className="select"
                            isSearchable = {true} maxMenuHeight={150}
                            value={{ value: major, label: major }}
                            onChange={(selectedOption) => setMajor(selectedOption.value)}
                            options={majors.map((majorOption, index) => ({
                                value: majorOption,
                                label: majorOption
                            }))}
                        />
                    </div>
                    {/* Filter State */}
                    <div className="filter">
                        <h3>State</h3>
                        <Select
                            className="select"
                            isSearchable = {true} maxMenuHeight={150}
                            value={{ value: state, label: state }}
                            onChange={(selectedOption) => setState(selectedOption.value)}
                            options={states.map((stateOption, index) => ({
                                value: stateOption,
                                label: stateOption
                            }))}
                        />
                    </div>
                </div>
                {/* Filter Tuition */}
                <div>
                    <div className="alignSlider">
                        <h3>Tuition</h3>
                        <InputRange maxValue={100000}
                                    minValue={0}
                                    value={tuition}
                                    allowSameValues
                                    formatLabel={(value) => `$${value}`}
                                    onChange={(value) => setTuition(value)}>       
                        </InputRange>
                    </div>
                    {/* <div className="align">
                        <div>
                            <p>Minimum value</p>
                            <input
                                type="number"
                                value={tuition.min}
                                onChange={(e) => setTuition({ ...tuition, min: e.target.value })}
                            />
                        </div>
                        <div>
                            <p>Maximum value</p>
                            <input
                                type="number"
                                value={tuition.max}
                                onChange={(e) => setTuition({ ...tuition, max: e.target.value })}
                            />
                        </div>
                    </div> */}
                </div>
                {/* Filter Cost of Living */}
                <div className="alignSlider">
                    <h3>Cost of Living</h3>
                    <InputRange maxValue={180}
                                minValue={85}
                                value={costLiving}
                                allowSameValues
                                onChange={(value) => setCostLiving(value)}>       
                    </InputRange>
                </div>
                {/* <input
                    type="number"
                    value={costLiving.min}
                    onChange={(e) => setCostLiving({ ...costLiving, min: e.target.value })}
                />
                <input
                    type="number"
                    value={costLiving.max}
                    onChange={(e) => setCostLiving({ ...costLiving, max: e.target.value })}
                /> */}
                {/* Filter Salary */}
                <div className="alignSlider">
                    <h3>Average Salary</h3>
                    <InputRange maxValue={300000}
                                minValue={0}
                                value={salary}
                                allowSameValues
                                onChange={(value) => setSalary(value)}>       
                    </InputRange>
                </div>
                {/* Filter ROI */}
                <div className="alignSlider">
                    <h3>ROI</h3>
                    <InputRange maxValue={1200}
                                minValue={0}
                                value={roi}
                                allowSameValues
                                onChange={(value) => setROI(value)}>       
                    </InputRange>
                </div>
                {/* <input
                    type="number"
                    value={roi.min}
                    onChange={(e) => setROI({ ...roi, min: e.target.value })}
                />
                <input
                    type="number"
                    value={roi.max}
                    onChange={(e) => setROI({ ...roi, max: e.target.value })}
                /> */}
            </div>
            <hr className="solid"></hr>
            <button onClick={handleApplyFilters}>Filter</button>
        </div>
    );
}

export default Filters;