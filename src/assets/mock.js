var data=fetch('https://recruitment-mock-data.gjg-ads.io/data')

.then(response => response.json())

.then(mock => {
    console.log(mock);
    console.log(mock.date);
})