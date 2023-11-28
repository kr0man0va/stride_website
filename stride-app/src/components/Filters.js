import React, {useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../customFilter.css';
import Select from 'react-select';

import { Tooltip } from 'react-tooltip';
import question from '../images/Question.png';

const Filters = ({parsedData, setFilteredData}) => {
    
    const [educationType, setEducationType] = useState('Show All');
    const [major, setMajor] = useState('Show All');
    const [state, setState] = useState('Show All');
    const [tuition, setTuition] = useState({min: 21000, max: 90000});
    const [costLiving, setCostLiving] = useState({min: 85, max: 180});
    const [roi, setROI] = useState({min: 0, max: 42000});
    const [salary, setSalary] = useState({min: 50000, max: 230000});

    const [showNaN, setShowNaN] = useState(false);

    const types = [
        { value: 'Show All', label: 'Show All' },
        { value: 'Public', label: 'Public' },
        { value: 'Private nonprofit', label: 'Private nonprofit' },
        { value: 'Private for-profit', label: 'Private for-profit' }];

    const majors = ['Show All', 'Engineering', 'Computer Science', 'Biology', 'Business', 'Art', 'Marketing'];

    const states = [
        'Show All', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const cleanValue = str => {
        if (typeof str === 'string' && str.trim() !== "") {
            const cleanedValue = str.trim().replace(/[^0-9.-]+/g, "");
            return isNaN(cleanedValue) ? NaN : parseInt(cleanedValue, 10);
        }
        return NaN;
    };

    const handleApplyFilters = () => {
        const filtered = parsedData.filter(item => {
          return (
            (educationType === 'Show All' || item["Type"] === (educationType)) &&
            (major === 'Show All' || item["Major"].includes(major)) &&
            (state === 'Show All' || item["State"] === (state)) &&
            (((showNaN && isNaN(cleanValue(item["In-State Tuition"]))) || 
                (!isNaN(cleanValue(item["In-State Tuition"])) && cleanValue(item["In-State Tuition"]) <= (tuition.max) && cleanValue(item["In-State Tuition"]) >= (tuition.min))) &&
            (((showNaN && isNaN(cleanValue(item["Cost Of Living Index"]))) || 
                (!isNaN(cleanValue(item["Cost Of Living Index"])) && cleanValue(item["Cost Of Living Index"]) <= (costLiving.max) && cleanValue(item["Cost Of Living Index"]) >= (costLiving.min)))) &&
            (((showNaN && isNaN(cleanValue(item["In-State ROI"]))) || 
                (!isNaN(cleanValue(item["In-State ROI"])) && cleanValue(item["In-State ROI"]) <= (roi.max) && cleanValue(item["In-State ROI"]) >= (roi.min)))) &&
            (((showNaN && isNaN(cleanValue(item["Average Salary"]))) || 
                (!isNaN(cleanValue(item["Average Salary"])) && cleanValue(item["Average Salary"]) <= (salary.max) && cleanValue(item["Average Salary"]) >= (salary.min))))
            ));
        });
        setFilteredData(filtered);
        console.log(filtered);
    };

    return(
        <div id="filters">
            <hr className="solid dissapear"></hr>
            {/* Filter Program Type */}
            <div id="col">
                <h2>What program are you interested in?</h2>
                <div id="drops">
                    <div className="filter">
                        <div className="align">
                            <h3>Type</h3>
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
                    <h2>Refine your search</h2>
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
                    <InputRange maxValue={42000}
                                minValue={0}
                                value={roi}
                                allowSameValues
                                onChange={(value) => setROI(value)}>       
                    </InputRange>
                </div>
                <div className="check">
                    <h3>Show not available values?</h3>
                    <input
                        type="checkbox"
                        checked={showNaN}
                        onChange={() => setShowNaN(!showNaN)}
                    />
                </div>
            </div>
            <hr className="solid dissapear"></hr>
            <button onClick={handleApplyFilters}>Filter</button>
        </div>
    );
}

export default Filters;