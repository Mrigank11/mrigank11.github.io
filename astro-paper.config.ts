import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://mrigank11.github.io",
    title: "Mrigank's Blog",
    description: "Just another tech blog full of random exciting stuff;",
    author: "Mrigank Krishan",
    profile: "https://mrigank11.github.io",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/Mrigank11/mrigank11.github.io/edit/main/src/content/posts/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/Mrigank11" },
    { name: "x", url: "https://x.com/zevtnax" },
    { name: "linkedin", url: "https://www.linkedin.com/in/mrigank-krishan-92b836153" },
    { name: "mail", url: "mailto:mrigankkrishan@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});