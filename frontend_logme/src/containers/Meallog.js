import React from 'react';
import Nav from '../components/Navbar'

const meallog = () => (
    <div className="container-fluid" id="wrapper">
        <p className="h2" id="meal_header">Search and Log Your Meals</p>
        <form className="parentTag-container" action="#">
            <div className="tag-container">
                <div className="tag">
                <span id = 'mealTag'>kiwi</span>
                </div>
                <input />
            </div>
            <input type="button" value="Start Log" id="tagSubmission"/>
        </form>
        <div className="kw_search">
            <form id="search-form" autocomplete="off">
                <p> 
                    <input type="text" name="search_term" id="search-term" placeholder="Start typing to begin search" maxlength="255" required=""/>
                </p>
            </form>
            <div id="results-box" className="results-card not-visible container">
            </div>
        </div>
        <div id="mealform">
            <div className="input-group mb-3">
                <form action="#" method="POST">
                    <label for="id_meal_type">Type of Meal:</label>
                    <select name="meal_type" id="id_meal_type">
                        <option value="breakfast">Breakfast</option>

                        <option value="brunch">Brunch</option>

                        <option value="snack">Snack</option>

                        <option value="lunch">Lunch</option>

                        <option value="dinner">Dinner</option>
                    </select>
                    <label for="id_meal_name">Meal Name:</label>
                    <input type="text" name="meal_name" className="field1" required="" id="id_meal_name"/>
                    <label for="id_mealId">Meal ID:</label>
                    <input type="text" name="mealId" className="field1" readonly="True" required="" id="id_mealId"/>
                    <label for="id_quantity">Number of servings:</label>
                    <input type="number" name="quantity" value="1" className="field1" required="" id="id_quantity"/>
                    <label for="id_date">Date:</label>
                    <input type="text" name="date" required="" id="id_date"/>
                    <label for="id_calories">Calories:</label>
                    <input type="text" name="calories" value="0.0" className="field1" required="" id="id_calories"/>
                </form>
            </div>
            <p>
                <input type="button" name="submit" value="Log Meal" className="btn btn-primary my-2"/>
            </p>
        </div>
    </div>
);

export default meallog;