'use strict'

const {db, models: {User, Trashbag} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)

  //Create trashbags
  const trash = await Promise.all([
    Trashbag.create( { fullness: 1.2, date: '2022-01-02'}),
    Trashbag.create( { fullness: 0.45, date: '2022-10-07'}),
    Trashbag.create( { fullness: 3.15, date: '2021-10-07'})
  ])

  console.log(`Trashbags seeded successfully`)

  //Set associations
  const setAssociations = async () => {
    const cody = users[0]
    const murphy = users[1]

    await cody.addTrashbags(trash[0])
    await murphy.addTrashbags(trash[1])
    await murphy.addTrashbags(trash[2])

    console.log(`Associations set successfully`)
  }

  console.log(`seeded successfully`)
  return setAssociations()
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
