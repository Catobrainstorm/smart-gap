// src/components/TermsPage.jsx
// Dedicated SmartGap Terms & Conditions Page (/terms)
// Complete verbatim legal text as provided by the organization.

import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export const TermsPage = () => {
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
            TERMS & CONDITIONS
          </h1>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-white/50 pt-2">
            <span>Version 1.0</span>
            <span>•</span>
            <span>Effective Date: 02nd February, 2026</span>
            <span>•</span>
            <span>Last Updated: 29th September, 2026</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-white/70 pt-1">
            SmartGap is operated by The Smartan Youth Development Foundation, a corporate body registered in Nigeria under Registration No. 181235.
          </p>
        </div>

        {/* PREAMBLE */}
        <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 font-body text-sm sm:text-base text-white/85 leading-relaxed font-light">
          <h2 className="text-lg sm:text-xl font-bold font-body text-white">
            Welcome to SmartGap.
          </h2>
          <p>
            These Terms & Conditions (“Terms”) govern your access to and use of SmartGap, including our website, application, learning platform, courses, community features, artificial intelligence features, mentorship programmes, events, opportunities and related services.
          </p>
          <p>
            SmartGap is operated by The Smartan Youth Development Foundation, Registration No. 181235, registered in Nigeria as a corporate body.
          </p>
          <p>
            The Smartan Youth Development Foundation is referred to in these Terms as “the Foundation,” “we,” “us,” or “our.” “SmartGap,” “the Platform,” “our Platform,” or “the Service” refers to the SmartGap programme, website, application and associated services operated by the Foundation.
          </p>
          <p>
            By creating an account, accessing the Platform, joining a SmartGap programme, or otherwise using the Service, you agree to these Terms. If you do not agree to these Terms, please do not use SmartGap.
          </p>
        </div>

        {/* TERMS BODY */}
        <div className="space-y-10 font-body text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              1. ABOUT SMARTGAP
            </h2>
            <p>
              SmartGap is a digital learning and personal development platform designed to help young people develop greater self-awareness, clarity, skills, perspective and direction.
            </p>
            <p>
              SmartGap may include structured video lessons; learning modules and levels; Quick Checks and assessments; reflections and assignments; XP and other progress systems; streaks and milestones; Shuri AI; personalized learning experiences; learner profiles; community discussions; events; mentorship; internships and other opportunities; and other educational and development experiences introduced from time to time.
            </p>
            <p>
              SmartGap is intended to support learning, reflection and personal development. It is not a guarantee of any particular educational, professional, financial or personal outcome.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              2. ACCEPTANCE OF THESE TERMS
            </h2>
            <p>
              By using SmartGap, you confirm that you have read these Terms, understand them, agree to be bound by them, and have the legal capacity to enter into this agreement or have the required consent of a parent or legal guardian where applicable.
            </p>
            <p>
              Additional terms may apply to specific programmes, events, mentorship arrangements, paid services or third-party opportunities.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              3. ELIGIBILITY
            </h2>
            <p>
              SmartGap may be designed primarily for young people, students, graduates and early-career individuals.
            </p>
            <p>
              The minimum age for particular SmartGap services may vary depending on the programme and applicable legal requirements.
            </p>
            <p>
              Where a programme is available to individuals below 18, additional safeguards, consent requirements or programme-specific conditions may apply.
            </p>
            <p>
              You must provide accurate information about your age and identity where requested and must not deliberately provide false information.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              4. YOUR ACCOUNT
            </h2>
            <p>
              Some SmartGap features require an account. You are responsible for providing accurate information, keeping account information current, protecting your login credentials and activity occurring through your account, except where caused by our own failure to maintain appropriate security.
            </p>
            <p>
              You must not share your password, allow another person to use your account, impersonate another person, create fraudulent accounts, or provide materially false or misleading information.
            </p>
            <p>
              If you believe your account has been compromised, notify us promptly.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              5. SMARTGAP LEARNING EXPERIENCE
            </h2>
            <p>
              SmartGap may organise learning into modules, lessons, levels, pathways or other progression structures.
            </p>
            <p>
              Access to some lessons or features may depend on completing earlier activities. A learner may, for example, watch a lesson, complete a Quick Check, receive or earn XP, reflect with Shuri and complete a milestone requirement before progressing.
            </p>
            <p>
              The specific structure of the learning experience may change as SmartGap develops.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              6. EDUCATIONAL CONTENT
            </h2>
            <p>
              SmartGap may provide videos, written content, exercises, assessments, frameworks, assignments, career resources, recommendations, external resources and other learning materials.
            </p>
            <p>
              Content is provided for learning and personal-development purposes. Although we aim to provide useful and accurate information, we do not guarantee that every piece will always be complete, current, error-free or suitable for every individual.
            </p>
            <p>
              You are responsible for considering how educational information applies to your own circumstances.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              7. QUICK CHECKS, ASSESSMENTS AND REFLECTIONS
            </h2>
            <p>
              SmartGap may use questions, assessments and reflective exercises to help you engage with learning.
            </p>
            <p>
              These may be used to check understanding, encourage deeper thinking, identify interests, personalize learning, measure progress, inform recommendations and contribute to your evolving learner profile.
            </p>
            <p>
              Assessment results and progress indicators should not automatically be interpreted as definitive statements about your intelligence, personality, abilities, future or career.
            </p>
          </section>

          {/* SECTION 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              8. XP, STREAKS, MILESTONES AND OTHER REWARDS
            </h2>
            <p>
              SmartGap may use XP, streaks, levels, badges, milestones, certificates, progress indicators, rankings, challenges and other recognition systems.
            </p>
            <p>
              These features are intended to encourage engagement and progress. Unless expressly stated otherwise, digital rewards do not represent money or financial assets, are not transferable or saleable, and may be adjusted, discontinued or modified as SmartGap evolves.
            </p>
            <p>
              Where SmartGap introduces a reward with actual monetary or material value, additional terms may apply.
            </p>
          </section>

          {/* SECTION 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              9. SHURI AI
            </h2>
            <p>
              SmartGap includes Shuri AI, SmartGap’s AI-powered learning and growth intelligence feature. Shuri may interact with you during onboarding, after lessons, during reflections, at milestones and elsewhere in the experience.
            </p>
            <p>
              Shuri may use your responses, lesson context, learning progress, reflections, stated interests, goals, previous interactions and other information you provide to make the experience more relevant and personalized.
            </p>
            <p>
              Shuri is an AI system. Its responses may occasionally be inaccurate, incomplete, out of context or unsuitable. You should use your own judgment when considering Shuri’s responses.
            </p>
            <p>
              Shuri is not a doctor, psychologist, therapist, lawyer, financial adviser, admissions officer, recruitment professional or other licensed professional, and should not be relied upon as a substitute for professional advice.
            </p>
            <p>
              Shuri may help identify interests, patterns, possible career directions, skills or areas for exploration, but does not determine your career. Career suggestions are exploratory and should be independently evaluated.
            </p>
            <p>
              SmartGap may use interactions and reflections to build an evolving understanding of learning preferences, interests, goals and development patterns. These signals are intended to support personalization and are not intended to constitute a diagnosis or permanent classification.
            </p>
          </section>

          {/* SECTION 10 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              10. REFLECTIONS AND LEARNER-GENERATED CONTENT
            </h2>
            <p>
              SmartGap may ask you to provide reflections after lessons or during other activities.
            </p>
            <p>
              You retain your rights in original content you create, subject to the rights necessary for us to operate SmartGap.
            </p>
            <p>
              By submitting content, you grant the Foundation a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, process and use it as reasonably necessary to provide SmartGap, facilitate learning, personalize the experience, operate Shuri AI, maintain and improve the Platform, provide support, maintain security and comply with legal obligations.
            </p>
            <p>
              We will handle personal information in accordance with our Privacy Policy. Private reflections submitted to Shuri will not be treated as public community posts merely because they were submitted to Shuri.
            </p>
          </section>

          {/* SECTION 11 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              11. USE OF LEARNER DATA FOR AI AND PERSONALIZATION
            </h2>
            <p>
              SmartGap may process learner information to provide personalized learning and development experiences, including generating structured signals about potential learning preferences, interests, goals, engagement patterns or areas for exploration.
            </p>
            <p>
              These signals are intended to evolve over time and may be uncertain or incomplete. SmartGap will not represent them as objective or permanent truths about a learner.
            </p>
            <p>
              Where third-party AI or technology providers are used, information may be processed by those providers subject to appropriate contractual and technical safeguards. Details are provided in the Privacy Policy.
            </p>
          </section>

          {/* SECTION 12 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              12. COMMUNITY
            </h2>
            <p>
              SmartGap may provide discussions, comments, groups, events, peer interactions, Smartan House activities and other community experiences.
            </p>
            <p>
              You are responsible for what you post or communicate and must treat other members respectfully.
            </p>
          </section>

          {/* SECTION 13 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              13. COMMUNITY RULES
            </h2>
            <p>
              You must not use SmartGap to harass, threaten, intimidate, bully, discriminate against or sexually exploit another person; publish another person’s private information without authorization; impersonate another person; distribute malicious software; commit fraud; facilitate illegal activity; publish content intended to cause serious harm; spam users; manipulate engagement systems; interfere with the Platform; attempt unauthorized access; scrape or systematically extract Platform content without permission; infringe intellectual-property rights; or otherwise misuse SmartGap.
            </p>
            <p>
              We may remove content or restrict accounts where we reasonably believe these Terms or our Community Guidelines have been violated.
            </p>
          </section>

          {/* SECTION 14 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              14. MENTORSHIP
            </h2>
            <p>
              SmartGap may provide access to mentors or mentorship programmes. Mentors may be employees, volunteers, contractors, partners or independent participants.
            </p>
            <p>
              Mentorship is intended to provide guidance, perspective and support. A mentor’s opinions or recommendations are their own unless expressly stated otherwise.
            </p>
            <p>
              SmartGap does not guarantee the quality or availability of any particular mentor, a particular relationship, employment, investment, admission, business success or other specific outcome.
            </p>
          </section>

          {/* SECTION 15 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              15. OPPORTUNITIES, INTERNSHIPS AND EXTERNAL PROGRAMMES
            </h2>
            <p>
              SmartGap may publish or facilitate internships, scholarships, jobs, fellowships, competitions, events, grants, training programmes, volunteer opportunities and other opportunities.
            </p>
            <p>
              Some opportunities are provided by third parties. SmartGap does not guarantee availability, eligibility, acceptance, third-party performance or any particular outcome. You should independently review third-party terms before participating.
            </p>
          </section>

          {/* SECTION 16 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              16. THIRD-PARTY SERVICES
            </h2>
            <p>
              SmartGap may contain links, integrations or references to third-party websites, applications, AI services or other services.
            </p>
            <p>
              Third-party services are generally governed by their own terms and privacy policies. We do not control every third-party service and are not responsible for its content, availability, security, policies or actions.
            </p>
          </section>

          {/* SECTION 17 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              17. INTELLECTUAL PROPERTY
            </h2>
            <p>
              The SmartGap Platform and its original materials—including branding, visual identity, software, interface, course structure, videos, graphics, text, illustrations, systems and other content—are owned by or licensed to the Foundation or relevant licensors.
            </p>
            <p>
              Except where expressly permitted, you may not copy, reproduce, redistribute, publicly display, commercially exploit, resell, modify, reverse engineer or create derivative works from SmartGap proprietary materials.
            </p>
            <p>
              Participation in SmartGap does not transfer ownership of SmartGap intellectual property to you.
            </p>
          </section>

          {/* SECTION 18 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              18. PERSONAL USE LICENCE
            </h2>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable and revocable right to access and use SmartGap for its intended educational and personal-development purposes. This licence ends when your account or access ends.
            </p>
          </section>

          {/* SECTION 19 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              19. YOUR CONTENT
            </h2>
            <p>
              You remain responsible for content you submit. You represent that you have the necessary rights to submit it and that it does not knowingly violate another person’s rights.
            </p>
            <p>
              You must not upload content you do not have permission to use, content containing another person’s private information without authorization, infringing content, fraudulent or deceptive content, malicious software, or content that violates applicable law.
            </p>
            <p>
              We may remove content that violates these Terms or creates legal, security or safety risks.
            </p>
          </section>

          {/* SECTION 20 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              20. PRIVACY
            </h2>
            <p>
              Your use of SmartGap involves processing personal information. Our Privacy Policy explains what we collect, why we collect it, how we use it, how Shuri interacts with learner information, sharing, retention, your privacy rights and how to contact us.
            </p>
            <p>
              The Privacy Policy forms part of these Terms.
            </p>
            <p className="font-mono text-xs sm:text-sm text-white/60">
              Privacy Policy URL: [INSERT PRIVACY POLICY URL]
            </p>
          </section>

          {/* SECTION 21 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              21. SECURITY
            </h2>
            <p>
              We take reasonable measures designed to protect SmartGap and user information. No online service can guarantee absolute security.
            </p>
            <p>
              You are responsible for protecting account credentials and notifying us of suspected unauthorized access.
            </p>
          </section>

          {/* SECTION 22 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              22. AVAILABILITY AND CHANGES TO SMARTGAP
            </h2>
            <p>
              We do not guarantee that SmartGap will always be available, uninterrupted, completely error-free, compatible with every device, unchanged or contain particular features.
            </p>
            <p>
              We may modify, suspend or discontinue features where reasonably necessary and, where appropriate, make reasonable efforts to communicate material changes.
            </p>
          </section>

          {/* SECTION 23 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              23. PAYMENTS AND PAID SERVICES
            </h2>
            <p>
              SmartGap may introduce paid programmes, subscriptions, events, certificates or other paid services.
            </p>
            <p>
              Where payment is required, applicable pricing and payment terms will be provided before the transaction. Additional terms may govern payment, subscriptions, renewal, cancellation, refunds, tickets and programme fees.
            </p>
            <p className="font-mono text-xs text-white/50 italic">
              [FINALISE PAYMENT/REFUND POLICY BEFORE LAUNCH OF ANY PAID PRODUCT.]
            </p>
          </section>

          {/* SECTION 24 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              24. SUSPENSION AND TERMINATION
            </h2>
            <p>
              We may suspend or terminate access where we reasonably believe you have materially violated these Terms, engaged in fraud or abuse, created a safety or security risk, used the account unlawfully, attempted to compromise the Platform, or created significant legal or operational risk.
            </p>
            <p>
              Where appropriate, we may provide notice and an opportunity to address the issue. Provisions that by their nature should survive termination will continue to apply.
            </p>
          </section>

          {/* SECTION 25 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              25. DISCLAIMERS
            </h2>
            <p>
              To the maximum extent permitted by applicable law, SmartGap is provided on an “as available” basis.
            </p>
            <p>
              We do not guarantee academic success, admission, employment, promotion, increased income, business success, improved mental health, a particular career, a particular level of personal development or any other specific outcome.
            </p>
            <p>
              Outcomes depend on many factors beyond our control, including decisions, circumstances, effort, external opportunities and third-party actions.
            </p>
          </section>

          {/* SECTION 26 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              26. NO PROFESSIONAL ADVICE
            </h2>
            <p>
              Nothing provided through SmartGap should be interpreted as professional medical, psychological, legal, financial or other regulated professional advice. This is particularly relevant to information provided through Shuri AI.
            </p>
            <p>
              Where you need professional advice, consult an appropriately qualified professional.
            </p>
          </section>

          {/* SECTION 27 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              27. LIMITATION OF LIABILITY
            </h2>
            <p>
              To the maximum extent permitted by applicable Nigerian law, the Foundation will not be liable for indirect, incidental, special, consequential or unforeseeable losses arising from your use of SmartGap.
            </p>
            <p>
              This may include losses arising from reliance on educational content or AI-generated information; third-party services or opportunities; community interactions; mentorship; loss of data; service interruptions; or decisions made based on information obtained through SmartGap.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.
            </p>
          </section>

          {/* SECTION 28 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              28. INDEMNITY
            </h2>
            <p>
              To the extent permitted by applicable law, you agree to be responsible for losses or claims arising from your material breach of these Terms, unlawful use of SmartGap, infringement of another person’s rights, or misuse of the Platform.
            </p>
            <p>
              This section will not apply to the extent the relevant loss was caused by our own unlawful conduct or negligence where liability cannot lawfully be excluded.
            </p>
          </section>

          {/* SECTION 29 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              29. CHILDREN AND YOUNGER USERS
            </h2>
            <p>
              SmartGap may serve young people, including potentially users under 18 depending on the programme.
            </p>
            <p>
              Where applicable, SmartGap may implement age restrictions, parental or guardian consent, restricted features or additional privacy protections.
            </p>
            <p>
              We will not knowingly design a service for children in a manner that bypasses applicable legal requirements. The Privacy Policy provides additional information about children’s privacy.
            </p>
          </section>

          {/* SECTION 30 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              30. CHANGES TO THESE TERMS
            </h2>
            <p>
              We may update these Terms as SmartGap develops or as legal, technical or operational requirements change.
            </p>
            <p>
              When material changes are made, we may provide notice through the Platform, email or another appropriate method. The updated Terms will include a new “Last Updated” date.
            </p>
            <p>
              Your continued use after the effective date constitutes acceptance where applicable.
            </p>
          </section>

          {/* SECTION 31 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              31. GOVERNING LAW
            </h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria.
            </p>
            <p>
              Disputes arising from these Terms or use of SmartGap shall be addressed in accordance with applicable Nigerian law.
            </p>
            <p>
              Where appropriate, the parties should first attempt to resolve disputes through good-faith discussion before commencing formal proceedings.
            </p>
            <p className="font-mono text-xs text-white/50 italic">
              [LEGAL COUNSEL TO CONFIRM THE APPROPRIATE COURT/JURISDICTION AND WHETHER A FORMAL ARBITRATION CLAUSE SHOULD BE INCLUDED.]
            </p>
          </section>

          {/* SECTION 32 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              32. SEVERABILITY
            </h2>
            <p>
              If any provision is unlawful, invalid or unenforceable, it will be interpreted or modified to the extent necessary to make it enforceable, where legally permitted. The remaining provisions continue to apply.
            </p>
          </section>

          {/* SECTION 33 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              33. ENTIRE AGREEMENT
            </h2>
            <p>
              These Terms, together with documents expressly incorporated into them—including the Privacy Policy and applicable programme-specific terms—constitute the agreement between you and the Foundation concerning your use of SmartGap.
            </p>
          </section>

          {/* SECTION 34 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              34. CONTACT US
            </h2>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 font-mono text-xs sm:text-sm text-white/90">
              <p className="font-bold text-white text-base">The Smartan Youth Development Foundation</p>
              <p><strong>Registration No.:</strong> 181235</p>
              <p><strong>Address:</strong> [INSERT REGISTERED ADDRESS]</p>
              <p><strong>Email:</strong> [INSERT OFFICIAL EMAIL]</p>
              <p><strong>Website:</strong> [INSERT WEBSITE]</p>
              <p><strong>SmartGap:</strong> [INSERT SMARTGAP WEBSITE]</p>
            </div>
          </section>

          {/* SECTION 35 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-body text-white">
              35. ACCEPTANCE
            </h2>
            <p>
              By selecting “I Agree,” “Create Account,” “Join SmartGap,” or an equivalent acceptance mechanism, or by using SmartGap where acceptance is otherwise legally effective, you acknowledge that you have read and agree to these Terms & Conditions.
            </p>
          </section>

          {/* CHECKLIST & LEGAL REVIEW NOTE */}
          <section className="space-y-3 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm font-mono text-white/70">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm sm:text-base">
              Pre-Publication Checklist
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Confirm the Foundation’s registered address.</li>
              <li>Confirm the official legal/contact email.</li>
              <li>Confirm SmartGap website and Privacy Policy URLs.</li>
              <li>Set the Effective Date and Last Updated date.</li>
              <li>Confirm SmartGap’s minimum age and under-18 consent model.</li>
              <li>Confirm payment, cancellation and refund rules before introducing paid services.</li>
              <li>Confirm the Foundation’s registered objects/purposes against the SmartGap programme.</li>
              <li>Confirm the appropriate Nigerian dispute-resolution and jurisdiction clause with counsel.</li>
              <li>Review the Terms alongside the final SmartGap Privacy Policy and Shuri AI disclosure.</li>
              <li>Obtain Nigerian legal counsel review before public launch.</li>
            </ul>
            <p className="pt-2 text-white/50 italic">
              Legal review note: This is a working Terms & Conditions draft for SmartGap and should be reviewed by qualified Nigerian legal counsel before publication or reliance as the Foundation’s final legal terms.
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-8 border-t border-white/10 text-center text-xs font-mono text-white/40">
        © {new Date().getFullYear()} SMARTGAP • THE SMARTAN YOUTH DEVELOPMENT FOUNDATION
      </footer>
    </div>
  );
};

export default TermsPage;
