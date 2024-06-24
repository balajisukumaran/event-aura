# Group 3 Web Application

- _Date Created_: June 24, 2024
- _Last Modification Date_: June 24, 2024
- _Application URL_: <https://event-aura.netlify.app/>
- _Git URL_: <https://git.cs.dal.ca/sshaji/csci-5709-grp-3>

## Authors

- Balaji Sukumaran (balaji.sukumaran@dal.ca)
- Kabilesh Ravi Chandran (kabilesh@dal.ca)
- Merin Mary Saju (mr457277@dal.ca)
- Nikita Davies (nk548914@dal.ca)
- Sruthi Shaji (sr569206@dal.ca)
- Vishaka Vinod (vs235403@dal.ca)

## Deployment

We created a new private repository on github for our web application deployment, and pushed our code to that repository by mirroring from our current gitlab repository. Then, we imported the web application on netlify from github and setup build settings to deploy the application. Finally, it was deployed and live on the mentioned link.

## Built With

- [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
- [npm](https://docs.npmjs.com//) - Dependency Management
- [Material](https://mui.com/material-ui/getting-started/) - Used for application CSS
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Used for responsive styling.

## Sources Used

### LandingPage.js

_Lines 28 - 43_

```
const sortEvents = (sortOption) => {
    let sortedEvents;
    if (sortOption === 'Recent Date first') {
        sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    else if (sortOption === 'Oldest Date first') {
        sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    else if (sortOption === 'Lowest price first') {
        sortedEvents = [...events].sort((a, b) => a.price - b.price);
    }
    else if (sortOption === 'Highest price first') {
        sortedEvents = [...events].sort((a, b) => b.price - a.price);
    }
    setEvents(sortedEvents);
};

```

We implemented the sort logic with help from ChatGPT. The following was the promt given to ChatGPT:

```

const getSampleData = () => {
    return [
        {
            id: 1,
            title: "Tech Innovators Conference 2024",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "1/12/2025",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 900
        },
        {
            id: 2,
            title: "Annual Health and Wellness Expo",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/11/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300
        },
        {
            id: 3,
            title: "International Culinary Festival",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "08/06/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 100
        },
];
};

how to sort in front end using date and price. 

```

The prompt provided by ChatGPT was as follows:

```
import React, { useState } from 'react';

// Function to get sample data
const getSampleData = () => {
    return [
        {
            id: 1,
            title: "Tech Innovators Conference 2024",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "1/12/2025",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 900
        },
        {
            id: 2,
            title: "Annual Health and Wellness Expo",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/11/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300
        },
        {
            id: 3,
            title: "International Culinary Festival",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "08/06/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 100
        }
    ];
};

// Sorting functions
const sortByDate = (events, ascending = true) => {
    return events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

const sortByPrice = (events, ascending = true) => {
    return events.sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
    });
};

const EventList = () => {
    const [events, setEvents] = useState(getSampleData());
    const [sortCriteria, setSortCriteria] = useState('date');
    const [ascending, setAscending] = useState(true);

    const handleSortChange = (event) => {
        const { value } = event.target;
        setSortCriteria(value);
        sortEvents(value, ascending);
    };

    const handleOrderChange = () => {
        const newOrder = !ascending;
        setAscending(newOrder);
        sortEvents(sortCriteria, newOrder);
    };

    const sortEvents = (criteria, ascending) => {
        let sortedArray = [];
        if (criteria === 'date') {
            sortedArray = sortByDate([...events], ascending);
        } else if (criteria === 'price') {
            sortedArray = sortByPrice([...events], ascending);
        }
        setEvents(sortedArray);
    };

    return (
        <div>
            <div>
                <label>Sort by:</label>
                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="date">Date</option>
                    <option value="price">Price</option>
                </select>
                <button onClick={handleOrderChange}>
                    {ascending ? 'Ascending' : 'Descending'}
                </button>
            </div>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <img src={event.image} alt={event.title} width="100" />
                        <h3>{event.title}</h3>
                        <p>{event.date} at {event.time}</p>
                        <p>{event.desc}</p>
                        <p>Price: ${event.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;


```

### FAQ.css

_Lines 28 - 39_

```
.answer {
    margin: 2%;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;

}

```

### EventCard.css

_Lines 54 - 66_

```

.event-desc {
    font-size: 0.8em;
    margin: 0% 5%;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
    flex: 1;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
}

```

We have used ChatGPT to create the css style for ellipsis in our code. The propmt given to ChatGPT was as follows:

```
.event-title {
    font-size: 0.8em;
    font-weight: bold;
    flex-wrap: wrap;
    display: flex;
    margin: 1.5%;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
}

i also want to make sure that if the title is too long, the title should be displayed like 
"too loooooong tit......"
instead of
"too loooooong title very long it cant be in one line it should be compresed"
what can i do here ?

```

The reponse from ChatGPT was as follows:

```
.event-title {
    font-size: 0.8em;
    font-weight: bold;
    display: flex;
    margin: 1.5%;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;

    /* Truncate text with ellipsis */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

### NavBar.js

_Lines 27 - 29_

```
<div className="navbar-menu-icon" onClick={toggleMenu}>
    <MenuIcon fontSize="large" style={{ color: "#FF9A00" }} />
</div>

```

We have adapted the icon components <MenuIcon> from [Material Icons](https://mui.com/material-ui/material-icons/).

### SearchBar.js

_Lines 24 - 28_

```
<DatePicker
  selected={date}
  onChange={(date) => setDate(date)}
  placeholderText="Pick a date .."
/>

```

We adapted this DatePicker from [React Date Picker](https://www.npmjs.com/package/react-datepicker).

```
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import './SearchBar.css';

const SearchBar = ({ searchTitle, setSearchTitle, searchDate, setSearchDate, onSearch }) => {

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="searchbar-container p-3">

                        <div className="search-input mb-3 mb-md-0">
                            <input type="text"
                                placeholder="Search events .."
                                value={searchTitle}
                                onChange={(event) => { setSearchTitle(event.target.value) }} />
                        </div>

                        <div className="search-date mb-3 mb-md-0">
                            <DatePicker
                                selected={searchDate}
                                onChange={(date) => setSearchDate(date)}
                                placeholderText="Pick a date .."
                            />
                        </div>
                        <button className="btn search-button" onClick={onSearch}>
                            <SearchTwoToneIcon sx={{ fontSize: 30 }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

```

The rest of the react code was developed by us. But we have used ChatGPT in order to provide responsive styles to my application.
The following was our prompt to ChatGPT:

```

I have a searchbar component in react as follows:

SearchBar.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';

const SearchBar = () => {
  const [date, setDate] = useState(null);

  return (
    <div className='searchbar-container'>
      <div className='search-input'>
        <input type="text" placeholder="Search events .." />
      </div>
      <div className='search-input'>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Pick a date .."
        />
      </div>
      <div className='search-input'>
        <button className='search-button'></button>
      </div>

    </div>
  );
};

export default SearchBar;



SearchBar.css

.searchbar-container{
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
  width: 50%;
  margin: 20px auto;
}

.search-input{
  flex: 1;
  padding: 10px;
}

.search-input input {
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.search-input .react-datepicker__input-container input{
  width: 40%;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 16px;
  padding: 5px 0;
  border-radius: 15px;
  text-align: center;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;

}

.search-input .search-button {
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 20px;
    cursor: pointer;
    margin-left: 30px;
    float: right;
}

.react-datepicker-wrapper {
    width: 200%;
    height: 200%;
  }

.react-datepicker__input-container input {
  width: 40%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.react-datepicker {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.react-datepicker__day--selected,
.react-datepicker__day--in-range,
.react-datepicker__day--keyboard-selected {
  background-color: #ff5a5f;
  color: white;
}

I want the styling to be responsive. Please can you convert this styles that i have created in web to a responsive style by using bootstrap?

```

ChatGPT provided the following response:

SearchBar.css

```
.searchbar-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
}

.search-input input {
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.search-input .react-datepicker__input-container input {
  width: 100%;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 16px;
  padding: 5px 0;
  border-radius: 15px;
  text-align: center;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}

.search-button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
}

.react-datepicker-wrapper {
  width: 100%;
}

.react-datepicker__input-container input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.react-datepicker {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.react-datepicker__day--selected,
.react-datepicker__day--in-range,
.react-datepicker__day--keyboard-selected {
  background-color: #ff5a5f;
  color: white;
}

```

SearchBar.js

```
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

const SearchBar = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="searchbar-container p-3">
            <div className="search-input mb-3 mb-md-0">
              <input type="text" className="form-control" placeholder="Search events .." />
            </div>
            <div className="search-input mb-3 mb-md-0">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Pick a date .."
                className="form-control"
              />
            </div>
            <div className="search-input">
              <button className="btn btn-danger search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

```

## Acknowledgments

- We are grateful to our TA for teaching us React and Netlify and guiding us along the way.
- We are thankful for all the resources and official documents that we went through for making our work easier.
