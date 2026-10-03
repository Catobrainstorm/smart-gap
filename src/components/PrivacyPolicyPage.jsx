// src/components/PrivacyPolicyPage.jsx
// Dedicated SmartGap Privacy Policy Page (/privacy)
// Complete verbatim legal text as provided by the organization.

import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col justify-between selection:bg-[#FF9600] selection:text-black">
      {/* Background ambient warmth */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-[#FF9600]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* STICKY TOP HEADER */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 flex items-center justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-white/80 hover:text-white transition-all group active:scale-95 shrink-0"
        >
          <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF9600]" />
          <span className="text-[11px] sm:text-xs">Back to SmartGap</span>
        </Link>

        <Link to="/" className="flex items-center group">
          <img
            src="/assets/logo.webp"
            alt="SmartGap"
            className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-6 py-12 sm:py-20 space-y-12">
        {/* DOCUMENT HEADER */}
        <div className="text-left space-y-4 border-b border-white/10 pb-8">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FF9600] font-bold block">
            Official Legal Document
          </span>
          <h1 className="display-title text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            PRIVACY POLICY
          </h1>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-white/50 pt-2">
            <span>Effective Date: 01st March 2026</span>
            <span>•</span>
            <span>Last Updated: 23rd September 2026</span>
          </div>
        </div>

        {/* POLICY BODY */}
        <div className="space-y-10 font-body text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              1. Overview
            </h2>
            <p>
              SmartGap (“SmartGap”, “we”, “us”, or “our”) is committed to protecting the privacy and personal information of people who use our website, applications, learning platform, programmes, community, events and related services (collectively, the “Services”).
            </p>
            <p>
              This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, when we may share it, and the rights you have over your information.
            </p>
            <p>
              SmartGap is designed to help people understand themselves, understand the world and design their future. Because our platform uses learning data and Shuri AI to personalize the learning experience, we take the responsible handling of learner information seriously.
            </p>
            <p>
              This Policy should be read together with our Terms of Use and any other privacy notices presented to you when you use specific SmartGap features.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              2. Who We Are
            </h2>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 font-mono text-xs sm:text-sm text-white/90">
              <p><strong>Legal Entity:</strong> The Smartan House Foundation</p>
              <p><strong>Trading Name:</strong> SmartGap</p>
              <p><strong>Registered Address:</strong> Plot 2, Omotayo, Isawo Road, Agric, Ikorodu, Lagos State, Nigeria.</p>
              <p><strong>Email:</strong> info@thesmartgap.com</p>
              <p><strong>Website:</strong> thesmartgap.com</p>
            </div>
            <p>
              For purposes of applicable Nigerian data-protection law, SmartGap may act as a data controller where we determine why and how personal data is processed, and may engage data processors to process information on our behalf.
            </p>
            <p>
              Where required, we will identify an appropriate privacy contact or Data Protection Officer.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              3. What Information We Collect
            </h2>
            <p>
              The information we collect depends on how you interact with SmartGap.
            </p>
            <h3 className="text-lg font-semibold text-white pt-2">
              3.1 Information You Provide Directly
            </h3>
            <p>
              When you create an account, apply to participate, join our waitlist, contact us or use the platform, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/75">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Username</li>
              <li>Password or authentication information</li>
              <li>Date of birth or age</li>
              <li>Gender, where voluntarily provided</li>
              <li>Location or general geographic information</li>
              <li>Educational background</li>
              <li>School, university or institution</li>
              <li>Course or field of study</li>
              <li>Career interests</li>
              <li>Skills and interests</li>
              <li>Personal goals</li>
              <li>Other information you voluntarily provide</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              4. Learning and Progress Information
            </h2>
            <p>
              When you use SmartGap, we may collect information about how you interact with the learning experience.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/75">
              <li>Courses and lessons completed</li>
              <li>Lessons started or abandoned</li>
              <li>Quick Check responses</li>
              <li>Scores and results</li>
              <li>XP earned</li>
              <li>Streaks</li>
              <li>Milestones</li>
              <li>Assignments and submissions</li>
              <li>Challenges completed</li>
              <li>Learning activity</li>
              <li>Course preferences</li>
              <li>Areas where you appear to need additional support</li>
              <li>Participation in discussions and community activities</li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              5. Shuri AI and Learner Reflections
            </h2>
            <p>
              Shuri AI is an important part of SmartGap.
            </p>
            <p>
              Shuri is SmartGap's AI-powered learning and growth intelligence layer. She interacts with learners during onboarding, after lessons, at milestone checkpoints and, where enabled, during career and future-architecture experiences.
            </p>
            <p>
              When you interact with Shuri, we may collect and process your questions and responses, reflections about lessons, goals and aspirations, stated interests, learning preferences, perceived strengths and challenges, career interests, responses to follow-up questions, conversation history, and structured insights generated from those interactions.
            </p>
            <p>
              SmartGap may create evolving learner signals from your interactions. These may relate to areas such as learning preferences, confidence, persistence, interests, motivation, goals or possible career directions. These signals are not intended to be permanent labels, diagnoses or definitive statements about who you are.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              6. What Shuri AI Does Not Do
            </h2>
            <p>
              Shuri is designed to support learning and reflection. Shuri is not intended to diagnose mental-health conditions; provide medical diagnoses; determine a person's worth or potential; permanently classify a learner's personality; make important life decisions on behalf of a learner; make employment, financial, educational or other legally significant decisions about you; or claim knowledge about you that you have not provided.
            </p>
            <p>
              Where SmartGap presents possible career or learning pathways, these are intended to support exploration and decision-making rather than replace your own judgment.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              7. Information We Collect Automatically
            </h2>
            <p>
              When you access our website or platform, we may automatically collect certain technical information, including IP address, browser type, device type, operating system, approximate location, pages or screens visited, referring pages, session information, login information, error and diagnostic information, and usage and performance data.
            </p>
            <p>
              We use this information to operate, secure, maintain and improve SmartGap.
            </p>
          </section>

          {/* SECTION 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              8. Cookies and Similar Technologies
            </h2>
            <p>
              SmartGap may use cookies, pixels, local storage and similar technologies.
            </p>
            <p>
              Essential technologies may keep you logged in, maintain security, remember necessary preferences and enable core platform functionality.
            </p>
            <p>
              Analytics technologies may help us understand how people use SmartGap, which pages or features are used, where users encounter problems, and how the platform performs.
            </p>
            <p>
              Preference technologies may remember choices and settings.
            </p>
            <p>
              Where applicable, marketing technologies may help us understand campaign performance or deliver relevant communications.
            </p>
            <p>
              Where consent is required, we will request it before using non-essential cookies or similar technologies.
            </p>
          </section>

          {/* SECTION 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              9. Why We Use Your Personal Data
            </h2>
            <p>
              Depending on the circumstances, SmartGap may process your personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/75">
              <li>Create and manage your account.</li>
              <li>Provide the SmartGap learning experience.</li>
              <li>Deliver lessons and learning materials.</li>
              <li>Track your progress.</li>
              <li>Personalize your learning experience.</li>
              <li>Facilitate Shuri AI interactions.</li>
              <li>Generate learner intelligence and insights.</li>
              <li>Recommend relevant learning experiences.</li>
              <li>Support career exploration and future planning.</li>
              <li>Operate our community.</li>
              <li>Facilitate events, mentorship and opportunities.</li>
              <li>Communicate with you.</li>
              <li>Respond to questions and support requests.</li>
              <li>Maintain platform security.</li>
              <li>Detect and prevent abuse, fraud or unauthorized activity.</li>
              <li>Analyse platform performance.</li>
              <li>Improve our products and services.</li>
              <li>Conduct research and product development.</li>
              <li>Meet legal and regulatory obligations.</li>
              <li>Protect our rights, users and platform.</li>
            </ul>
          </section>

          {/* SECTION 10 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              10. Legal Bases for Processing
            </h2>
            <p>
              Depending on the circumstances, SmartGap may rely on one or more lawful bases for processing personal data, including consent, contract, legal obligation, legitimate interests, and other lawful bases available under applicable law.
            </p>
            <p>
              The applicable lawful basis may depend on the specific information and purpose involved.
            </p>
          </section>

          {/* SECTION 11 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              11. How We Use Learner Intelligence
            </h2>
            <p>
              SmartGap's personalization system may use information gathered from your learning activity and reflections to identify patterns that can help improve your experience.
            </p>
            <p>
              These signals may be used to personalize content, questions, recommendations or future experiences. They should be treated as evolving signals rather than definitive judgments.
            </p>
            <p>
              You should not be denied access to important opportunities or subjected to legally significant decisions solely because of an automated learner profile unless permitted by applicable law and appropriate safeguards are in place.
            </p>
          </section>

          {/* SECTION 12 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              12. How We Share Personal Data
            </h2>
            <p>
              We do not sell your personal information.
            </p>
            <p>
              We may share information with trusted third parties where necessary to operate SmartGap, including cloud hosting providers, database providers, authentication providers, AI and machine-learning service providers, analytics providers, communication and email providers, customer-support providers, security providers, payment providers where applicable, event or programme partners, mentorship or opportunity partners where relevant, professional advisers, and regulators or government authorities where legally required.
            </p>
            <p>
              Where third parties process personal data on our behalf, we will seek appropriate contractual and organisational safeguards.
            </p>
          </section>

          {/* SECTION 13 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              13. AI Service Providers
            </h2>
            <p>
              Some SmartGap AI functionality may depend on third-party AI infrastructure. Where applicable, learner information may be transmitted to an AI service provider to generate a response or perform a processing function.
            </p>
            <p>
              SmartGap will take reasonable steps to select appropriate providers, limit the information shared to what is necessary, establish appropriate contractual protections, protect personal information, understand how providers process submitted information, and avoid using learner information for unrelated purposes without an appropriate legal basis.
            </p>
            <p>
              The specific AI providers used by SmartGap may change as the platform develops. Where relevant, additional disclosures may be provided for particular AI-powered features.
            </p>
          </section>

          {/* SECTION 14 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              14. International Data Transfers
            </h2>
            <p>
              Some of our service providers may process or store information outside Nigeria. Where personal data is transferred internationally, SmartGap will take steps required by applicable data-protection law to ensure that the transfer is subject to appropriate safeguards.
            </p>
          </section>

          {/* SECTION 15 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              15. Data Security
            </h2>
            <p>
              We take reasonable technical and organisational measures to protect personal data against unauthorized access, unauthorized disclosure, loss, destruction, alteration, misuse, and accidental or unlawful processing.
            </p>
            <p>
              These measures may include access controls, authentication, encryption where appropriate, secure infrastructure, logging, monitoring, backups and internal security procedures.
            </p>
            <p>
              However, no internet service or electronic storage system can be guaranteed to be completely secure.
            </p>
            <p>
              If we become aware of a personal-data breach that requires notification under applicable law, we will take the appropriate steps required by law.
            </p>
          </section>

          {/* SECTION 16 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              16. How Long We Keep Your Information
            </h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, unless a longer period is required or permitted by law.
            </p>
            <p>
              Retention periods may vary depending on the type of information, purpose for processing, whether you maintain an active account, legal or regulatory requirements, security requirements, dispute resolution, and legitimate business requirements.
            </p>
            <p>
              When information is no longer required, we will take reasonable steps to delete, anonymize or securely dispose of it.
            </p>
          </section>

          {/* SECTION 17 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              17. Your Privacy Rights
            </h2>
            <p>
              Subject to applicable law and any relevant limitations, you may have rights including the right to be informed; access; rectification; objection; restriction of processing; erasure; data portability; withdrawal of consent where processing is based on consent; and rights concerning automated decision-making and profiling.
            </p>
            <p>
              You may also have the right to lodge a complaint with the relevant supervisory authority.
            </p>
          </section>

          {/* SECTION 18 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              18. How to Exercise Your Rights
            </h2>
            <p>
              To exercise a privacy right or ask a question about how SmartGap processes your information, contact:
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-xs sm:text-sm text-white/90">
              <p><strong>Privacy Email:</strong> info@smartgap.com</p>
              <p><strong>Subject line:</strong> Data Privacy Request</p>
            </div>
            <p>
              Please include enough information for us to understand your request and verify your identity where necessary. We may need to request additional information to confirm that a request genuinely comes from the relevant data subject.
            </p>
          </section>

          {/* SECTION 19 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              19. Children's Privacy
            </h2>
            <p>
              SmartGap is designed primarily for young people and may potentially be accessed by individuals who are under the age of 15 depending on the programme or service.
            </p>
            <p>
              Where SmartGap processes personal data belonging to children or other vulnerable data subjects, we will apply safeguards required by applicable law.
            </p>
            <p>
              Where parental or guardian consent is legally required, SmartGap will obtain or verify appropriate consent before processing the relevant information.
            </p>
            <p>
              We will not knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law.
            </p>
          </section>

          {/* SECTION 20 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              20. Community, Mentorship and Opportunities
            </h2>
            <p>
              SmartGap may provide discussions, events, mentorship, internships, opportunities and community activities.
            </p>
            <p>
              Information you voluntarily make visible to other users may be accessible to those users. You should therefore avoid publicly posting information that you would not want other participants to see.
            </p>
            <p>
              Where a SmartGap feature requires sharing your information with a partner, we will provide appropriate notice and, where required, obtain your consent before doing so.
            </p>
          </section>

          {/* SECTION 21 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              21. Third-Party Websites and Services
            </h2>
            <p>
              SmartGap may contain links to third-party websites, applications or services. Those services operate under their own privacy policies. SmartGap is not responsible for the privacy practices of third-party services that we do not control.
            </p>
          </section>

          {/* SECTION 22 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              22. Marketing Communications
            </h2>
            <p>
              Where permitted by law, SmartGap may send communications about product updates, new learning experiences, events, opportunities, community activities, news and announcements.
            </p>
            <p>
              Where required, we will obtain appropriate consent for marketing communications.
            </p>
            <p>
              You may unsubscribe from promotional emails by using the unsubscribe mechanism provided in the communication or by contacting us. Some essential service communications may still be sent even if you opt out of marketing communications.
            </p>
          </section>

          {/* SECTION 23 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              23. Changes to Your Information
            </h2>
            <p>
              You should keep your SmartGap account information accurate and up to date. Where the platform allows it, you may update information directly through your account. You may also contact us to request correction of inaccurate or incomplete information.
            </p>
          </section>

          {/* SECTION 24 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              24. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes to SmartGap, new products or features, changes to how we process personal data, changes to applicable law, regulatory guidance, or security and operational requirements.
            </p>
            <p>
              When we make material changes, we will take reasonable steps to notify users. The updated version will be published on the SmartGap website or application with a new “Last Updated” date.
            </p>
          </section>

          {/* SECTION 25 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              25. Contact Us
            </h2>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 font-mono text-xs sm:text-sm text-white/90">
              <p className="font-bold text-white text-base">SmartGap</p>
              <p><strong>Legal Entity:</strong> The Smartan House Foundation</p>
              <p><strong>Address:</strong> Plot 2, Omotayo, Isawo Road, Agric, Ikorodu, Lagos State, Nigeria.</p>
              <p><strong>Privacy Email:</strong> [INSERT PRIVACY EMAIL]</p>
              <p><strong>General Email:</strong> thesmartgapprogram@gmail.com</p>
            </div>
          </section>

          {/* SECTION 26 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              26. Complaints
            </h2>
            <p>
              We encourage you to contact SmartGap first so that we can investigate and attempt to resolve your concern.
            </p>
            <p>
              You also have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) where you believe your data-protection rights have been infringed.
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-8 border-t border-white/10 text-center text-xs font-mono text-white/40">
        © {new Date().getFullYear()} SMARTGAP • THE SMARTAN HOUSE FOUNDATION
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
