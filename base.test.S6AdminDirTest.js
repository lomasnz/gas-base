function testDir() {
   var list = AdminDirectory.Users.list({ domain: "section6.nz" });
   console.log(list);
}

function testCurrentUser() {
  console.log(S6AdminDir.currentUser());
}
