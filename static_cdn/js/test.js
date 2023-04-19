// const schools = ["Yorktown", "Washington & Liberty", "Wakefield"];

// const editName = (oldName, name, arr) => 
//     arr.map(item => {
//         if (item.name === oldName) {
//             return {
//                 ...item,
//                 name
//             }; 
//         } else {
//             return item;
//         }
//     });

// const schools = {
//     Yorktown: 10,
//     "Washington & Liberty": 2,
//     Wakefield: 5
//   };
  
//   const schoolArray = Object.keys(schools).map(key => ({
//     name: key,
//     wins: schools[key]
//   }));
  
//   console.log(schoolArray);

// const editName = (oldName, name, arr) => 
//     arr.map(item => (item.name === oldName ? { ...item, name} : item));

// let schools = [
//     { name: "Yorktown" },
//     {name: "Stratford" },
//     { name: "Washington & Liberty" },
//     { name: "Wakefield" }
// ];

// let updatedSchools = editName("Stratford", "HB Woodlawn", schools);

// console.log(updatedSchools[1]);
// console.log(schools[1]);


// const wSchools = schools.filter(school => school[0] === 'W');

// const cutSchool = (cut, list) => list.filter(school => school !== cut);

// const highSchools = schools.map(school => `${school} High School`);

// const highSchools = schools.map(school => ({ name: school }));

// console.log(highSchools);



// console.log(schools.join("\n"));
// console.log(wSchools.join(", "));
// console.log(cutSchool("Washington & Liberty", schools).join(", "));

// const invokeIf = (condition, fnTrue, fnFalse) => 
//   condition ? fnTrue() : fnFalse();

// const showWelcome = () => console.log("Welcome !!!");

// const showUnauthorized = () => console.log("Unauthorized !!!");

// invokeIf(true, showWelcome, showUnauthorized);
// invokeIf(false, showWelcome, showUnauthorized);


// const ages = [21, 18, 42, 40, 64, 63, 34];

// const maxAge = ages.reduce((max, age) => {
//   console.log(`${age} > ${max} = ${age > max}`);
//   if (age > max) {
//     return age;
//   } else {
//     return max;
//   }
// }, 0);

// console.log("maxAge", maxAge);

// 21 > 0 = true
// 18 > 21 = false
// 42 > 21 = true
// 40 > 42 = false
// 64 > 42 = true
// 63 > 64 = false
// 34 > 64 = false
// maxAge 64


const userLogs = userName => message =>
  console.log(`${userName} -> ${message}`);

const log = userLogs("grandpa23");

log("attempted to load 20 fake members");
getFakeMembers(21).then(
  members => log(`successfully loaded ${members.length} members`),
  error => log("encountered an error loading members")
);