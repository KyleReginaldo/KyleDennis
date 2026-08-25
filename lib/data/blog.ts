export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "diagram"; kind: "clean-architecture" | "playstore-steps" | "ai-agent-loop" }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  /** Hex accent color that themes tags, blockquotes, and diagrams for this post. */
  accent: string
  date: string
  readTime: string
  tags: string[]
  coverImage: string
  coverAlt: string
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "flutter-clean-architecture-explained",
    title: "Flutter Clean Architecture: What It Is and Why It Matters",
    excerpt:
      "A practical breakdown of Clean Architecture in Flutter — the three layers, the dependency rule, and when the extra files actually pay off.",
    accent: "#0175C2",
    date: "2026-08-18",
    readTime: "8 min read",
    tags: ["Flutter", "Architecture", "Best Practices"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop",
    coverAlt: "Lines of code displayed on a laptop screen",
    content: [
      {
        type: "p",
        text: "Every Flutter project starts the same way: a few screens, a bit of state, an API call or two. Then six months later there's a widget that fetches data, formats it, validates it, and navigates on tap, all in one build method, and nobody wants to touch it. Clean Architecture is the discipline that keeps that from happening.",
      },
      { type: "h2", text: "What Is Clean Architecture?" },
      {
        type: "p",
        text: "Clean Architecture, popularized by Robert C. Martin, organizes code into concentric layers where dependencies only point inward. Your business logic doesn't know Flutter exists. Flutter doesn't know your database exists. Each layer only knows about the layer directly inside it, never the other way around. That one rule, the dependency rule, is the entire idea.",
      },
      { type: "diagram", kind: "clean-architecture" },
      { type: "h2", text: "The Three Layers in a Flutter App" },
      { type: "h3", text: "Presentation" },
      {
        type: "p",
        text: "Widgets, screens, and your state management of choice (Bloc, Riverpod, Provider, whatever). This layer's only job is to render state and forward user actions to the domain layer. It should not contain business rules, and it should not talk to Firebase or REST APIs directly.",
      },
      { type: "h3", text: "Domain" },
      {
        type: "p",
        text: "Pure Dart, no Flutter imports allowed. This is where entities, use cases, and repository interfaces live. A use case like GetUserProfile or PlaceOrder describes one thing your app does, independent of where the data comes from or how it's displayed.",
      },
      { type: "h3", text: "Data" },
      {
        type: "p",
        text: "Repository implementations, data sources, and DTOs/models that map raw JSON or database rows into domain entities. This is the only layer allowed to know about Dio, Firestore, SharedPreferences, or whatever backend you're using.",
      },
      {
        type: "code",
        language: "text",
        code: `lib/
  features/
    profile/
      presentation/
        profile_screen.dart
        profile_cubit.dart
      domain/
        entities/user.dart
        usecases/get_user_profile.dart
        repositories/user_repository.dart
      data/
        models/user_model.dart
        repositories/user_repository_impl.dart
        datasources/user_remote_data_source.dart`,
      },
      {
        type: "code",
        language: "dart",
        code: `// domain/repositories/user_repository.dart
abstract class UserRepository {
  Future<User> getProfile(String userId);
}

// domain/usecases/get_user_profile.dart
class GetUserProfile {
  final UserRepository repository;
  GetUserProfile(this.repository);

  Future<User> call(String userId) => repository.getProfile(userId);
}`,
      },
      {
        type: "p",
        text: "Notice the domain layer only depends on an abstract UserRepository. The concrete implementation, the one that actually calls an API, lives in the data layer and gets injected at runtime. Swap Firebase for a REST backend later and the domain and presentation layers never notice.",
      },
      { type: "h2", text: "Why It's Worth the Extra Files" },
      {
        type: "list",
        items: [
          "Testability — use cases and entities are plain Dart classes, so you can unit test business logic without spinning up a widget tree or a fake backend.",
          "Swappable data sources — moving from REST to GraphQL, or adding offline caching, only touches the data layer.",
          "Team scalability — multiple developers can work on presentation, domain, and data in parallel without stepping on each other.",
          "Framework independence — your business rules survive a Flutter version bump, a state management migration, even a rewrite of the UI.",
        ],
      },
      {
        type: "quote",
        text: "Clean Architecture doesn't slow you down on day one. It saves you on day one hundred, when the app has grown past what fits in your head at once.",
      },
      { type: "h2", text: "When You Might Skip It" },
      {
        type: "p",
        text: "Be honest about the size of what you're building. A weekend prototype, a throwaway demo, or a single-screen utility app doesn't need three layers and a folder for each feature. Cargo-culting the full structure onto a todo-list tutorial just adds ceremony. Clean Architecture earns its cost on apps that will be maintained, extended, and touched by more than one person over time.",
      },
      { type: "h2", text: "Getting Started" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write your domain entities and use cases first, before any UI exists.",
          "Define repository interfaces in the domain layer before writing a single implementation.",
          "Add a simple dependency injection setup (get_it or riverpod's provider graph) to wire implementations to interfaces.",
          "Unit test the domain layer first — it's the cheapest, fastest tests you'll write in the whole project.",
          "Let the presentation layer stay thin: display state, forward events, nothing else.",
        ],
      },
      {
        type: "p",
        text: "Clean Architecture isn't about following a diagram exactly. It's about making sure the decision to change your backend, your state management, or your UI framework never turns into a rewrite of everything else.",
      },
    ],
  },
  {
    slug: "publish-flutter-app-to-play-store",
    title: "Publishing Your Flutter App to the Play Store, the Easy Way",
    excerpt:
      "A no-fluff, step-by-step walkthrough of getting a Flutter app from flutter build to a live Play Store listing.",
    accent: "#01875F",
    date: "2026-08-22",
    readTime: "9 min read",
    tags: ["Flutter", "Play Store", "Deployment"],
    coverImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1600&q=80&auto=format&fit=crop",
    coverAlt: "Smartphone home screen showing a grid of mobile apps",
    content: [
      {
        type: "p",
        text: "Building the app is the fun part. Getting it in front of real users through the Play Store feels like the boring part, right up until your first install count ticks up from zero. Here's the whole path, in order, with nothing skipped.",
      },
      { type: "diagram", kind: "playstore-steps" },
      { type: "h2", text: "1. Get a Google Play Developer Account" },
      {
        type: "p",
        text: "Head to play.google.com/console, pay the one-time $25 registration fee, and complete identity verification. This can take anywhere from a few hours to a couple of days, so do it before you need it, not the night before a launch.",
      },
      { type: "h2", text: "2. Prepare Your App for Release" },
      { type: "h3", text: "Set your app identity" },
      {
        type: "p",
        text: "Set a permanent applicationId in android/app/build.gradle — once published, this can never change. Bump versionCode for every single upload (it must always increase) and versionName for the human-readable version users see.",
      },
      { type: "h3", text: "Add icons and splash screens" },
      {
        type: "p",
        text: "Use the flutter_launcher_icons package to generate every required icon size from one source image instead of exporting a dozen PNGs by hand.",
      },
      { type: "h2", text: "3. Sign Your App" },
      {
        type: "p",
        text: "The Play Store requires every release to be cryptographically signed. Generate an upload keystore once and reuse it for every future release.",
      },
      {
        type: "code",
        language: "bash",
        code: `keytool -genkey -v -keystore ~/upload-keystore.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 \\
  -alias upload`,
      },
      {
        type: "code",
        language: "properties",
        code: `# android/key.properties (never commit this file)
storePassword=<your-store-password>
keyPassword=<your-key-password>
keyAlias=upload
storeFile=/absolute/path/to/upload-keystore.jks`,
      },
      {
        type: "p",
        text: "Reference key.properties from android/app/build.gradle's signingConfigs, and add key.properties and *.jks to .gitignore. Losing this keystore means you can never update your app under the same listing again, so back it up somewhere safe outside the repo.",
      },
      { type: "h2", text: "4. Build the Release Bundle" },
      {
        type: "code",
        language: "bash",
        code: `flutter build appbundle --release`,
      },
      {
        type: "p",
        text: "The Play Store requires an Android App Bundle (.aab), not an APK. Google uses it to generate optimized, device-specific downloads, which means smaller installs for your users and no extra work for you.",
      },
      { type: "h2", text: "5. Set Up Your Store Listing" },
      {
        type: "list",
        items: [
          "Screenshots for phone (minimum 2) and, if relevant, tablet",
          "A 1024x500 feature graphic",
          "Short description (80 characters) and full description (up to 4000)",
          "A privacy policy URL — required even for the simplest app that touches the internet",
          "Completed content rating questionnaire",
          "Target audience and Data Safety form, listing exactly what data your app collects",
        ],
      },
      { type: "h2", text: "6. Upload and Roll Out" },
      {
        type: "p",
        text: "Don't push straight to production. Upload the .aab to an Internal testing track first to sanity-check the build, then move to Closed or Open testing with a small group of real users. Only promote to Production once you're confident, and even then, consider a staged rollout (say, 20%) so a bad build only reaches a fraction of users before you catch it.",
      },
      { type: "h2", text: "7. Review and Go Live" },
      {
        type: "p",
        text: "Review typically takes anywhere from a few hours to a few days. The most common rejection reasons are a missing or broken privacy policy link, permissions the app requests but doesn't justify, and a Data Safety form that doesn't match what the app actually collects. Get those right up front and most reviews sail through.",
      },
      { type: "h2", text: "Quick Checklist Before You Hit Submit" },
      {
        type: "list",
        items: [
          "versionCode incremented from the last release",
          "Upload keystore backed up outside the repo",
          "Privacy policy URL live and correct",
          "Data Safety form matches actual data collection",
          "Tested the signed release build on a real device, not just debug mode",
          "Staged rollout percentage set for the first production release",
        ],
      },
      {
        type: "p",
        text: "None of this is hard, it's just sequential. Do it once, write down your keystore location and package name somewhere safe, and every release after the first takes minutes.",
      },
    ],
  },
  {
    slug: "ai-coding-agents-for-flutter",
    title: "Using AI Coding Agents in Flutter Projects: Where They Actually Help",
    excerpt:
      "Field notes on where tools like Claude Code genuinely speed up Flutter development, where they quietly make a mess, and the workflow that keeps them useful.",
    accent: "#7C3AED",
    date: "2026-08-25",
    readTime: "7 min read",
    tags: ["Flutter", "AI Tools", "Productivity"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80&auto=format&fit=crop",
    coverAlt: "Abstract visualization of an AI network of connected nodes",
    content: [
      {
        type: "p",
        text: "AI coding agents are a normal part of the Flutter workflow now, not a novelty. The question stopped being whether to use one and became where it actually saves time versus where it quietly creates work for you later. Here's what that split looks like in practice.",
      },
      { type: "diagram", kind: "ai-agent-loop" },
      { type: "h2", text: "What Agents Are Actually Good At" },
      { type: "h3", text: "Boilerplate and repetitive scaffolding" },
      {
        type: "p",
        text: "New feature folder with presentation/domain/data subfolders, a model class generated from a JSON sample, a form with five fields and matching validators — this is exactly the kind of mechanical, pattern-following work an agent does faster than you'd type it.",
      },
      { type: "h3", text: "Widget-level busywork" },
      {
        type: "p",
        text: "Turning a rough description into a first-draft widget tree, or converting a StatefulWidget to Riverpod or Bloc, is mostly mechanical translation. An agent gets you 80% of the way there in seconds, which is still worth it even if you rewrite the last 20%.",
      },
      { type: "h3", text: "Writing tests for the domain layer" },
      {
        type: "p",
        text: "This is where it compounds nicely with Clean Architecture. If your use cases and repositories are pure Dart with interfaces already defined, an agent can describe test cases and write the mocks accurately, because there's no Flutter widget tree or platform noise to guess about.",
      },
      { type: "h3", text: "Debugging error messages" },
      {
        type: "p",
        text: "Paste a stack trace or a gradle error and get a plausible root cause in seconds, especially for the platform-channel and dependency-conflict errors that would otherwise send you to five different GitHub issues.",
      },
      { type: "h2", text: "Where They Fall Short" },
      { type: "h3", text: "Architecture decisions" },
      {
        type: "p",
        text: "An agent will happily write a feature that fetches data straight from a widget's build method if you don't explicitly ask for it to respect your layers. It doesn't know your dependency rule unless you tell it, and it won't push back on breaking it.",
      },
      { type: "h3", text: "Platform-specific gotchas" },
      {
        type: "p",
        text: "Gradle version conflicts, signing configuration, iOS provisioning — agents often suggest fixes that were correct for an older Flutter or Gradle version and are outdated or simply wrong today. Verify anything touching android/build.gradle or Info.plist against current docs before applying it.",
      },
      { type: "h3", text: "State management by vibes" },
      {
        type: "p",
        text: "A provider wired subtly wrong, a missing dispose, a rebuild loop that only shows up after a few minutes of real use — none of that shows up in a green build. You still have to run the app and watch it.",
      },
      { type: "h2", text: "A Workflow That Actually Works" },
      {
        type: "list",
        ordered: true,
        items: [
          "Describe the change in terms of the layer it belongs to (domain, data, or presentation), not just the visible behavior — this keeps the agent inside your architecture instead of shortcutting through it.",
          "For anything touching more than one file, ask for a plan before code, and read the plan before saying go.",
          "Run flutter analyze and your test suite after every agent-applied diff. A build that compiles is not the same as a build that's correct.",
          "Review the diff like a junior developer's pull request, not like a compiler output — read every line once.",
          "Keep prompts scoped to one use case or one widget at a time. Broad prompts produce broad, harder-to-review diffs.",
        ],
      },
      {
        type: "quote",
        text: "The agent writes the first draft. You still own the architecture.",
      },
      { type: "h2", text: "Should You Use One?" },
      {
        type: "p",
        text: "For the grunt work, yes — boilerplate, tests, migrations, and first-draft widgets are exactly what these tools are built for. Keep the architecture decisions and the final review with a human who understands the app's structure. That split is where solo developers and small teams get the most real time back, time better spent on product decisions than on typing the same repository pattern for the fourth time this month.",
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
