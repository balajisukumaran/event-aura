# Group 3 Web Application

- _Date Created_: June 24, 2024
- _Last Modification Date_: June 24, 2024
- _Application URL_: <https://event-aura.netlify.app/>
- _Git URL_: <https://git.cs.dal.ca/sshaji/csci-5709-grp-3>

## Authors

- Balaji Sukumaran (bl664064@dal.ca)
- Kabilesh Ravi Chandran (kb320903@dal.ca)
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
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Used for responsive styling
- [Axios](https://axios-http.com/) - Axios was used for making API calls
- [Node](https://nodejs.org/docs/latest/api/) -  The javascript runtime environment used
- [Netlify](https://www.netlify.com) - The deployment tool used for the frontend
- [Google Cloud Run](https://cloud.google.com/run/) - The deployment tool used for the backend
- [Java](https://www.java.com/en/) - Java was used for developing the backend of the application
- [Spring Boot](https://spring.io/) - Spring was used as the web framework for the backend
- [MongoDB](https://www.mongodb.com/) - MongoDB was used as the database for the backend
- [JWT](https://jwt.io/) - JWT was used for authentication purposes
- [Stripe](https://stripe.com/en-ca) - Stripe was used for payment gateway integration purposes


## Code Integration Instructions

### Backend

- Clone the repository using the following command: `git clone https://git.cs.dal.ca/sshaji/csci-5709-grp-3.git`
- Navigate to the backend folder using the following command: `cd backend/`
- Run the server using the following command: `java -jar /csci-5709-grp-3/backend/target/backend-0.0.1-SNAPSHOT.jar`

### Frontend

- Clone the repository using the following command: `git clone https://git.cs.dal.ca/sshaji/csci-5709-grp-3.git`
- Navigate to the frontend folder using the following command: `cd frontend/`
- Install the dependencies using the following command: `npm install`
- Run the server using the following command: `npm run start`


## Sources Used

### Signup.jsx

*Lines 31 - 34*
```
const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(inputPhoneNumber);
};
```
The code uses the JavaScript Regular Expression found in [GeeksForGeeks](https://www.geeksforgeeks.org/how-to-validate-mobile-number-length-in-reactjs/) to be able to ensure that the user enters a valid 10-digit phone number in the contact field.

```
// Regular expression to match exactly 10 digits
const regex = /^\d{10}$/;
```

### SecurityConfig.java

*Lines 25 - 38*
```
httpSecurity
        .csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/**")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
```

This code uses the httpSecurity class and its builder methods explained in the [Spring Security documentation](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html).

```
 @Configuration
 @EnableWebSecurity
 public class FormLoginSecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.authorizeHttpRequests().requestMatchers("/**").hasRole("USER").and().formLogin();
                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService() {
                UserDetails user = User.withDefaultPasswordEncoder()
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();
                return new InMemoryUserDetailsManager(user);
        }
 }
```

### JwtService.java

*Lines 34 - 40*
```
return Jwts.builder()
    .setClaims(extraClaims)
    .setSubject(userDetails.getUsername())
    .setIssuedAt(new Date(System.currentTimeMillis()))
    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) //token is valid for 24 hours + 1000 ms
    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
    .compact();
```
This code follows the [Medium](https://medium.com/@tericcabrel/implement-jwt-authentication-in-a-spring-boot-3-application-5839e4fd8fac) post on implementing JWT authentication in a Spring Boot 3 application. This article was used to help generate the JWT token that is used for authentication.

```
return Jwts
    .builder()
    .setClaims(extraClaims)
    .setSubject(userDetails.getUsername())
    .setIssuedAt(new Date(System.currentTimeMillis()))
    .setExpiration(new Date(System.currentTimeMillis() + expiration))
    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
    .compact();
}
```

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
### Stepper.jsx

*Lines 8-22*

```
 <Stepper activeStep={currentStep} 
      stepClassName={'stepper__step'}
       styleConfig={{
              activeBgColor: '#176fcd',
              activeTextColor: '#fff',
              inactiveBgColor: '#fff',
              inactiveTextColor: '#2b7cff',
              completedBgColor: '#fff',
              completedTextColor: '#2b7cff',
              size: '2em'
            }}>
        {steps.map((step, index) => (
          <Step key={index} label={step.label} />
        ))}
      </Stepper>

```
The code above was created by adapting the code in [react-form-stepper - Official NPM Documentation](https://www.npmjs.com/package/react-form-stepper) as shown below: 

```
<Stepper activeStep={1}>
  <Step label="Children Step 1" />
  <Step label="Children Step 2" />
  <Step label="Children Step 3" />
</Stepper>

// CustomStepper.js
const CustomStepper = () => {
  return <Stepper steps={[{ label: 'Step 1' }, { label: 'Step 2' }]} activeStep={1} />;
};

export default CustomStepper;

```
- The code in [react-form-stepper - Official NPM Documentation](https://www.npmjs.com/package/react-form-stepper) was taken as reference and we learned how the original component can be used and we modified the original code to suit our requirements and added additionally styles to adapt it according to our need.

### Dropzone.jsx

*Lines 30 - 99*

```
function DropzoneComponent({ onFilesSelected }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles, "acceptedfiles");
      onFilesSelected(acceptedFiles);
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles(updatedFiles);
    },
    [onFilesSelected]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div className="row">
      <div className="col-md-10">
        {file.path} - {file.size} bytes{" "}
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-sm btn-danger mt-1"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const newFiles = [...files];
            newFiles.splice(newFiles.indexOf(file), 1);
            setFiles(newFiles);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here.</div>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );

```
The code above was created by adapting the code in [React Dropzone](https://react-dropzone.js.org/) as shown below: 

```
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

```
- The code in [React Dropzone](https://react-dropzone.js.org/) was used because we felt that taking the code from the official documentation of react dropzone will be the best way to learn and understand the various aspects like implmentation and styling.
- [React Dropzone](https://react-dropzone.js.org/) Example helped us realise how dropzone component can be used, how functions can be invoked on the onDrop of the component.

### AwsConfig.java

*Lines 4-36*

```
package com.eventaura.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AwsConfig {
    @Value("${access.key.id}")
    private String accessKeyId;

    @Value("${access.key.secret}")
    private String accessKeySecret;

    @Value("${s3.region.name}")
    private String s3RegionName;

    @Bean
    public AmazonS3 getAmazonS3Client() {
        final BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .withRegion(s3RegionName)
                .build();

    }
}

 

```
The code above was created by adapting the code in [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) as shown below: 

```
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class AmazonConfig {
    @Bean
    public AmazonS3 s3() {
        AWSCredentials awsCredentials =
                new BasicAWSCredentials("accessKey", "secretKey");
        return AmazonS3ClientBuilder
                .standard()
                .withRegion("ap-south-1")
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}

```
- The code in [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) was used because we felt that taking the article clearly explained the configuration steps needed to configure aws in apring boot for image upload to S3 
- [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) Helped us identify the steps needed to configure aws and we modified the code as per our requirements by adding necessary environment variables to achieve our task.


### AwsUtils.java

*Lines 55-73*

```
 @Async
    public String uploadFileToS3(final MultipartFile multipartFile, String type, String type_id) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            String fileName = file.getName();
            if (type == "EVENT_IMAGES") {
                fileName = "event-images/" + type_id + "/" + file.getName();
            }
            final PutObjectRequest s3ObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
            amazonS3.putObject(s3ObjectRequest);
            Files.delete(file.toPath());
            return fileName;
        } catch (AmazonServiceException e) {
            System.out.println("Error {} occurred while uploading file" + e.getLocalizedMessage());
        } catch (IOException ex) {
            System.out.println("Error {} occurred while deleting temporary file" + ex.getLocalizedMessage());
        }
        return null;
    }
```
The code above was created by adapting the code in [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) as shown below: 

```
public String uploadFile(MultipartFile multipartFile) {
    String fileUrl = "";
    try {
        File file = convertMultiPartToFile(multipartFile);
        String fileName = generateFileName(multipartFile);
        fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
        uploadFileTos3bucket(fileName, file);
        file.delete();
    } catch (Exception e) {
       e.printStackTrace();
    }
    return fileUrl;
}

```
- The code in [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) was used because we felt that this article clearly explained the steps needed to push an image to S3 in spring boot for image upload to S3 
- [How to upload files to Amazon S3 in Spring Boot](https://dev.to/paulodhiambo/how-to-upload-files-to-amazon-s3-in-spring-boot-2p40) Helped our identify the steps needed to upload an image and we modified the code as per our requirements by adding necessary changes to file path etc to achieve my task.

## EmailServiceForNotification.java

*Lines 39-50*

```
private void sendEmail(String organizerName, String eventTitle, String eventDescription, List<String> followerEmails) {
        for (String email : followerEmails) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("New Event Created by " + organizerName);
            message.setText("Hello,\n\n" +
                    organizerName + " has created a new event titled '" + eventTitle + "'.\n\n" +
                    "Event Description: " + eventDescription + "\n\n" +
                    "Best regards,\nEvent Aura Team");

            emailSender.send(message);
        }
```
We used SMTP protocol to send Email to Multiple Recipients.Adapted from [How to send emails to multiple recipients from Spring Boot?](https://mailtrap.io/blog/spring-send-email/#How-to-send-emails-to-multiple-recipients-from-Spring-Boot)


## Acknowledgments

- We are thankful to our professor, Gabriella Mosquera for providing us this learning opportunity.
- We are grateful to our TAs for teaching us React and Netlify and guiding us along the way.
- We are also thankful for all the resources and official documents that we went through for making our work easier.
