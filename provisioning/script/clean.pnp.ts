import { sp } from '@pnp/sp';

const solutionName = `MVP-MONITOR`;

(async () => {
  const web = sp.web;

  console.log(`\nLists`);
  const lists = await web.lists
    .get()
    .then(ll => ll.filter(l => l.Description.indexOf(solutionName) !== -1));
  for (const list of lists) {
    console.log(` ${list.Title}`);
    await web.lists.getById(list.Id).delete();
  }

  console.log(`\nContent types`);
  const cts = await web.contentTypes.filter(`Group eq '${solutionName}'`).get();
  for (const ct of cts) {
    console.log(`  ${ct.Name}`);
    await web.contentTypes
      .getById(ct.Id.StringValue)
      .delete()
      .catch(_ => {
        console.log(`  Rerun needed, as ${ct.Name} is used for inheritence`);
      });
  }

  console.log(`\nFields`);
  const fields = await web.fields.filter(`Group eq '${solutionName}'`).get();
  for (const field of fields) {
    console.log(` ${field.Title}`);
    await web.fields.getById(field.Id).delete();
  }

  console.log('\nDone');

})().catch(console.warn);
