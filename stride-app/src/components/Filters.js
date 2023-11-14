import React, {useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../customFilter.css';
import Select from 'react-select';

import { Tooltip } from 'react-tooltip';
import question from '../images/Question.png';

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
                        <div className="align">
                            <h3>Program Type</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="
                                Program Type identifies whether an institution is public or private and specifies if it offers 2-year or 4-year programs.
                                "
                                data-tooltip-place="top"/>
                            <Tooltip id="my-tooltip" arrowColor="rgb(86,29,226)" style={{backgroundColor:"rgb(86,29,226)", maxWidth:"400px", color:"white", zIndex:"900", borderRadius:"20px", fontWeight:"400"}}/>
                        </div>
                        <Select className="select"
                            isSearchable = {true} maxMenuHeight={150}
                            value={{ value: educationType, label: educationType }}
                            onChange={(selectedOption) => setEducationType(selectedOption.value)}
                            options={types}
                        />
                    </div>
                    {/* Filter Major */}
                    <div className="filter">
                        <div className="align">
                            <h3>Major</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    Major represents the primary field of study or specialization offered by an educational institution.
                                    "
                                    data-tooltip-place="top"/>
                        </div>        
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
                        <div className="align">
                            <h3>State</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    State denotes the geographical location of the educational institution.
                                    "
                                    data-tooltip-place="top"/>
                        </div> 
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
                        <div className="align">
                            <h3>Tuition</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    Tuition refers to the cost range associated with attending the educational institution. All values are in U.S. dollars.
                                    "
                                    data-tooltip-place="top"/>
                        </div> 
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
                        <div className="align">
                            <h3>Cost of Living Index</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    The Cost of Living Index represents the relative expenses associated with residing in the area where the educational institution is located. It factors in accommodation, food, transportation, and other essential living costs. A higher index indicates a relatively higher cost of living in that region.
                                    "
                                    data-tooltip-place="top"/>
                        </div> 
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
                        <div className="align">
                            <h3>Average Salary</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    Average Salary signifies the median income earned by graduates from the educational institution. It provides insights into the potential earnings one might expect after completing a program. A higher average salary often reflects better career prospects and financial outcomes for graduates.
                                    "
                                    data-tooltip-place="top"/>
                        </div> 
                    <InputRange maxValue={300000}
                                minValue={0}
                                value={salary}
                                allowSameValues
                                onChange={(value) => setSalary(value)}>       
                    </InputRange>
                </div>
                {/* Filter ROI */}
                <div className="alignSlider">
                        <div className="align">
                            <h3>ROI</h3>
                            <img src={question} alt='Question mark' style={{width:'30px', height: '30px', margin:'0 5px'}}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="
                                    ROI, or Return on Investment, is a metric that evaluates the profitability and financial gain of participating in a program. It considers factors such as tuition costs, living expenses, and average salary after graduation. A higher ROI indicates a potentially more lucrative investment in education, emphasizing the long-term value of the institution in relation to its associated costs.
                                    "
                                    data-tooltip-place="top"/>
                        </div> 
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