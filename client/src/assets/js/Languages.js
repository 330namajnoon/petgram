export function Languages() {
  this.language = "english";
  this.languages = {
    home:{
      english:"home",
    },
    write_a_comment: {
      english:"Write a comment",
    },
    contacts:{
      english:"Contacts",
    },
    all_storys:{
      english:"All Storys",
    },
    follow:{
      english:"Follow",
    },
    unfollow:{
      english:"Unfollow",
    },
    pending_follower: {
      english:"Pending Follower",
    }

  }
}
Languages.prototype.setLanguage = function(language = "english") {
  this.language = language;
}
Languages.prototype.getWord = function(word = "home") {
  return this.languages[word][this.language];
}
