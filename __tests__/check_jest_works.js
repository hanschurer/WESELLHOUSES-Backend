// check that the npm environment has set the test DB correctly
test('Jest should use the test DB', ()=> {
  expect(process.env.DB_DATABASE).toBe('wesellhouse');
})

// This test fails because 1 !== 2
xit('Testing to see if Jest works', () => {
    expect(1).toBe(2)
  })

// This passes because 1 === 1
xit('Testing to see if Jest works 2', () => {
    expect(1).toBe(1)
  })
