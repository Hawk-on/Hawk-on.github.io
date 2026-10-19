---
tittel: "The consent that was not free"
publisertDato: 2026-10-18
sprak: en
omsetjing: samtykket-som-ikkje-var-fritt
ingress: "In October 2026 Dexcom placed a dialog box in front of people's blood sugar readings: accept the new terms, or uninstall the app. For someone with type 1 diabetes that is not a choice between two products. It is a choice between signing and losing the alarm that wakes you at night."
tags: ["teknofoydalisme", "personvern", "helseteknologi", "gdpr", "ai", "forbrukarmakt"]
---

## The dialog box that stopped the readings

In October 2026 Dexcom users opened their phones and could not find their blood sugar. They found a dialog box. The new terms had to be accepted, and if you would not accept them, the advice was to uninstall the app.

InsideHealthPolicy covered it on 16 October. The company was trying to calm a revolt on social media. It had told patients to leave the app if they would not accept the new terms. The trade press described the change as three things at once: the use of data for artificial intelligence features, mandatory arbitration, and a waiver of class actions. And the company is already facing a string of lawsuits from users [\[1\]](#ref-1). Two of the three turned out not to be new, and I will come back to that.

Three changes, then, and all three are worth putting in plain words.

**Data for model training** means your readings can be used to train software that will later sell advice to other people.

**Mandatory arbitration** means that if you believe the company has harmed you, you cannot go to an ordinary court. A private arbitrator decides, in a process the parties pay for themselves, and which is rarely open to anyone else.

**A class action waiver** means you cannot join forces with others in the same position. Everyone has to run their own case alone.

It is worth pausing on what kind of product this is. A continuous glucose monitor is not an app you happen to have on your phone. It is a medical device that warns you when your blood sugar falls while you sleep.

Here I should be precise, because an alternative to the app does exist. Dexcom sells a handheld receiver that displays glucose and gives alarms without a phone. The company calls it optional itself [\[2\]](#ref-2), and in Norway you cannot get one on your own initiative; Dexcom's answer is that you should contact a healthcare professional [\[3\]](#ref-3). When the company recalled that very receiver in 2025, because the speaker could fail and the alarm fall silent, it stated that the app is the display device for a majority of its users globally [\[4\]](#ref-4). That statement was made while the company was limiting the scope of a recall, so it leans the same way as the claim it is being used to support. No exact figure is public.

For those who only have the app, and that is the majority, the alternative is not a different app. It is finger pricks, and nobody waking you.

## What a consent is worth when the alternative is hospital

Contract law rests on one assumption: that either party could have walked away.

That assumption does not hold here, and this is not a rhetorical point. Severe hypoglycaemia, a dangerous fall in blood sugar, can cause seizures, loss of consciousness and in the worst case death. The night alarm is the whole reason the device exists. A user facing a dialog box with two buttons, one of which removes that alarm, is not choosing between sets of terms. They are choosing between signing and taking a risk they cannot assess on the spot.

Dexcom has put this more plainly than I could. The Norwegian terms state that if you do not consent to the new terms, you have the right to stop using the services and the apps [\[5\]](#ref-5).

That is your right. You can stop using it.

## Why now

The timing is the most revealing part of the whole affair, and here I move into interpretation. I am flagging it, so the reader can weigh it independently.

In May 2024 Dexcom lost a round in the California Court of Appeal about exactly this. Five patients had been prescribed the Dexcom G6. Four were seriously injured, and in Hebert's case it ended in death, after the device failed to alert them that their blood sugar was too low or too high. Five product liability actions followed, meaning claims that the manufacturer should answer for harm the device caused. In the fifth, Hebert's daughters also brought a wrongful death claim, alongside the claim on behalf of their father's estate. The company sought to force all five into arbitration, on the grounds that the users had ticked a box reading "I agree to the Terms of Use" when they set up the app [\[6\]](#ref-6).

The court said no, two votes to one, with Justice Irion dissenting. The case is *Herzog v. Superior Court*, decided 16 May 2024. The reasoning is narrow and precise. A clickwrap box is ordinarily binding, but Dexcom had undone its effect itself: the company told the user that the click was an authorisation to collect and store sensitive personal health information. It could then not show that the same click was an **unambiguous** acceptance of the terms, including the arbitration clause. So no arbitration agreement had been formed with any of the plaintiffs [\[6\]](#ref-6).

Read that again, and then think about a dialog box that covers the whole screen, stops the readings, and demands a tap before the app continues.

The evidentiary standard the court set was that consent must be unambiguous. A blocking dialog box produces unambiguous consent. I cannot establish that this was the purpose, and I have found no document that says so. But it is the same defect, and it is the same party.

Meanwhile the company is fighting on two fronts at once.

One is a securities lawsuit brought by investors. It has been consolidated into a lead case in federal court, with a consolidated complaint filed in January 2025 and an expanded version in April 2026. The claim is that the company made design changes to the G6 and G7 that were not authorised, and did not tell its shareholders [\[7\]](#ref-7).

The other is consumer litigation. At least two class actions have been filed on behalf of users, alleging that the sensors were sold with defects [\[8\]](#ref-8), and further individual injury claims followed through 2026.

Here I owe the reader a note. I have seen it stated that the company's second quarter 2026 filing mentions six class actions concerning the G6 and G7. I have not been able to confirm that number against the filing itself, so I do not use it. What I can confirm is that the company is simultaneously facing a consolidated investor suit and at least two from users. That is enough for the point, which is that the arbitration question is not theoretical for Dexcom right now.

## What the regulator has already classified

The open question in this story is whether the low alarms were suppressed while the dialog box was on screen. I have found no source that answers it, neither in trade press nor in regulatory filings, and I am not going to assert anything about it.

But the question is not speculative, and it is worth saying why.

In July 2025 Dexcom issued an urgent medical device correction notice for the G7 and ONE+ apps. A design error meant the app did not warn the user when the transmitter failed. The app ended the sensor session, stopped reporting glucose values and displayed "Start Sensor" or "no active sensor", without saying anything.

The US Food and Drug Administration set out what that can lead to. The user does not know they have gone for long periods without glucose data, notifications and alarms. Treatment therefore comes too late in prolonged episodes of severe hypoglycaemia or hyperglycaemia. The agency states plainly that use of the affected product may cause serious adverse health consequences, including death [\[9\]](#ref-9).

The agency classified the correction as the most serious type of recall. The upgrade was mandatory, and the app stopped working on 20 August 2025 for anyone who had not updated [\[9\]](#ref-9).

So it is already established that "the app silently stops working" is a documented and life threatening failure mode in this exact product. That does not answer the question about the dialog box. It makes it a question somebody ought to answer.

## What the models need

One of the three changes concerns artificial intelligence, and the company's direction there is well documented by the company itself.

At the American Diabetes Association conference in June 2026, Dexcom announced two things at once. The Stelo app, which is sold without prescription and aimed at people not using insulin, had been rewritten and cleared by the FDA in May 2026, with early access for selected users from 5 June. And the company had agreed to buy Nutrisense, a service that connects dietitian advice to glucose readings [\[10\]](#ref-10).

Chief executive Jake Leach called it a more accessible and connected ecosystem. The aim was to help as many people as possible understand their glucose health, through real time insight, personalised support and coaching [\[10\]](#ref-10).

There is nothing wrong with that ambition. But personalised coaching based on patterns in glucose data is a model, and a model is trained on data.

Previously the company sold devices to people with a diagnosis. Now it wants to sell subscriptions to coaching for people without one. That requires large volumes of glucose data, and the only place it exists is among those already using the devices.

Those people are the patients. It is their data the change in terms is about.

## Seven days in Norway

This is where the story becomes Norwegian, and it does so in two ways I did not expect.

Some context for readers outside Europe. Norway is not a member of the European Union, but it is part of the European Economic Area, which means the General Data Protection Regulation applies in full. Norwegian consumers have the same data protection rights as consumers in Germany or France. The supervisory authority is Datatilsynet, the Norwegian Data Protection Authority, and medical devices are regulated by Direktoratet for medisinske produkter, the Norwegian Medical Products Agency.

The first finding is in the Norwegian terms, clause 2.1. Dexcom may change the agreement and notify you by reasonable means, for instance by posting a notice on its website. And then comes the clause: continued use of Dexcom services or apps for seven days without objecting on your part constitutes acceptance of those changes [\[5\]](#ref-5).

So you do not have to tap anything. If you keep using the device that keeps you alive, you have accepted. Seven days of use is a consent.

The second is something I went looking for and did not find. The agreement has country specific sections for Japan, South Korea, Austria, Switzerland, Germany and Singapore, where each country has negotiated its own consumer protections into the text.

German users got two things. Changes to the service must have a valid reason, and they cannot put the user in a materially worse position. And the company cannot disclaim liability for gross negligence, for intent, or for injury to life or health. Austrian and Swiss users got a clause saying that new additional terms only apply if they are presented in advance. And they have twice as long to object to a change: fourteen days, against the seven that apply to everyone else [\[5\]](#ref-5).

Sentences like that do not appear by themselves. They are there because a regulator, a consumer body or a court demanded them, and because the company wanted to keep selling in that country.

The word "Norge" does not appear in the document. Nor does "norsk". Not once.

The document is also old. The Norwegian terms Dexcom publishes today are effective from 25 February 2021 [\[5\]](#ref-5). The American text on the same website is effective from 26 January 2023 [\[11\]](#ref-11). The October terms, the ones that triggered the dialog box, are not published at either address; both predate the story, and neither mentions artificial intelligence.

A Norwegian user therefore gets a Norwegian translation of the American terms, in a version two years older than the one Americans get to read. Disputes are to be settled by an American arbitration body under American rules. The class action waiver is unchanged. And the adaptations our neighbours received are missing.

I also found no right to opt out anywhere in the Norwegian text, neither a deadline nor a procedure for staying outside arbitration.

The only protection mentioned is the general statement that consumers resident in the EU also have whatever protection follows from the law of their home country [\[5\]](#ref-5). That is true, and it is why the arbitration clause probably does not hold against a Norwegian consumer. But it sits as a footnote to a text otherwise written as though it applies.

## Consent that is not free

The General Data Protection Regulation has a provision written for precisely this situation.

Article 7(4) concerns when consent has been freely given. One question is to weigh heaviest: do you have to say yes to uses of your data that the service does not need, in order to get the service at all? If the answer is yes, the consent is unlikely to be free [\[12\]](#ref-12).

The recitals of an EU law are the introduction that explains how the rules are to be understood. Recital 43 is blunter still. Consent does not hold as a legal basis where there is a clear imbalance between the person the data concerns and the party deciding what it is used for.

And consent is to be treated as unfree in two situations. One is when you cannot give separate consent to different processing operations on the data, where separating them would have been appropriate. The other is when you have to say yes to something the service does not need, in order to use it [\[12\]](#ref-12).

"Accept or uninstall" looks like the definition of an absent separate consent. But here I have to separate three things, and one of them I am correcting now.

**The arbitration and the class action waiver are not new.** I wrote above that the trade press described the change as three things at once. Go to the Norwegian terms and both the arbitration clause and the class action waiver are there, effective 25 February 2021 [\[5\]](#ref-5). They are not something October 2026 introduced. That does not weaken the objection to them, but it moves it: this is a term Norwegians have lived under for five years without knowing it, not a fresh deterioration.

**The AI use is confirmed, but not in the form I needed.** Dexcom writes on its own AI principles page that the company uses personal information in AI technology: "our use of personal information in connection with AI-enabled technologies" [\[13\]](#ref-13). That is the company on the record. But the page does not say that glucose readings train models, and it mentions not one choice the user has. The only control it promises is control over health decisions, not over data processing. The page exists in English only.

**The consent flow I still have not seen.** Whether the alarm and the model training sit behind the same button in the app is not confirmed. If they do, recital 43 is squarely on point. If they do not, this step falls, and what remains is a question of contract law instead.

Here I have to be precise, because this is a distinction many people skip. Terms of use are a contract you enter. Consent under data protection law is something else, and a company does not always need consent to use data. It can instead point to the use being necessary to perform the contract, or to what is called a legitimate interest, meaning a reason that outweighs the disadvantage to the person concerned. If Dexcom relies on one of those rather than consent, Article 7(4) does not bite directly.

But then the question returns in another form, and it is no easier. The contract is about warning a patient of dangerous blood sugar. Can it then be necessary to train software that will sell advice to other people?

And here is what I cannot get an answer to, however closely I read. The Norwegian privacy policy lists its purposes in one series, and its legal bases in another. "Internal research and development to evaluate the effectiveness of and improve our products" appears as a purpose. The legal bases stand separately: legitimate interests, performance of a contract, legal obligations, provision of healthcare, public health, and "in circumstances where we have asked for and received consent". But the two lists are never joined up [\[14\]](#ref-14). You cannot read out of the document which basis covers research and development. That is not a detail. The whole question of whether Article 7(4) applies at all depends on that answer, and the document does not give it.

I have found no trace of any Norwegian authority looking at this. Datatilsynet has not commented. I found no coverage in Norwegian or Nordic media at all. The Norwegian Diabetes Association has nothing about it on its website. A matter affecting thousands of Norwegian patients with a serious chronic illness has passed unnoticed.

## The counterarguments deserve an answer

**Terms have to be changeable.** Of course. A company that cannot update its agreement cannot correct errors in it either. My objection is not that the terms were changed, but that the change was placed as a barrier in front of a medical function. The distinction is practical and easy to hold: blood sugar alerts could have continued while the user made up their mind.

**The AI features are optional.** Probably, in the sense that nobody forces you to use a coach. But here I have to separate two objections that are easily run together, and I ran them together myself in the first draft.

That arbitration and the class action waiver sit behind the same button as everything else is a problem of contract law. It is not a data protection problem, because recital 43 concerns separate consent to different processing operations on personal data, and an arbitration clause is not such an operation. Setting up "data sharing or arbitration" as an example of absent separate consent is therefore the wrong use of the provision.

The question the recital actually raises is narrower: can the user refuse to have their data used to train models and still get the alarm? If they cannot, recital 43 bites. If they can, it does not. I have not managed to document which of the two is the case, and until I have, I cannot use the recital as evidence here.

**Arbitration is faster and cheaper for the consumer.** This is the best counterargument, and it is not empty. An individual taking on a listed company faces costs and delays that in practice close the courthouse door. But the argument does not explain the class action waiver, which is the opposite of making things cheaper for the individual. The point of a class action is that small claims which cannot carry a lawsuit alone can carry one together. Remove it and the disputes do not disappear. They simply are not brought.

**This is American law and does not apply in Norway.** Largely true, and this is where I could have got it wrong had I written the piece from American sources alone. Parts of Norwegian consumer protection cannot be contracted away, whatever the contract says, and an arbitration clause of this kind stands weakly against a Norwegian consumer. But a right you have to know about, invoke and have tested is not the same as a right written into the agreement you were given. German users have their protection in the document. Norwegians have a sentence saying they probably have something somewhere else.

## The platform under your skin

Yanis Varoufakis calls it technofeudalism. The market is gradually replaced by something older, where the owner of the platform sets the terms because they own the ground everything happens on, and where the income is not profit from a sale but rent from access [\[15\]](#ref-15).

This series has followed the same pattern through three earlier pieces. An accounting method settled a question of sovereignty before politics got a word in. A language model was built by the state, and nobody was given the job of running it. Three companies reallocated the world's memory capacity, and a customer category of hundreds of millions of people fell away without anyone deciding it should.

This is the same mechanism, moved under the skin. The sensor sits in your arm, but the reading travels through an app, and the app is a platform somebody owns. When the owner changes the terms, the patient has the right the agreement grants them: the right to stop.

What makes this worth writing about is not that a company behaved badly. It is that nobody here has to have done anything wrong for the outcome to be unreasonable. The lawyers wrote a clause that closes an evidentiary gap. The product people built a dialog box that secures unambiguous consent. The strategists bought a company that needs data. Taken separately, each decision is defensible.

The sum is that a person with a chronic illness opens their phone at three in the morning and meets a contract.

*This piece belongs to the series on technofeudalism and public infrastructure.*

## Sources

<span id="ref-1" data-kvalitet="B" data-habilitet="1">B1</span>\[1\] C. Smith, "Dexcom Attempts To Address Social Media Fallout On New Mandatory Terms And Conditions," *InsideHealthPolicy*, 16 October 2026. [Online]. Available: https://insidehealthpolicy.com/inside-telehealth-daily-news/dexcom-attempts-address-social-media-fallout-new-mandatory-terms-and. [Accessed: 18 October 2026]. Trade press under editorial responsibility. The body text is behind a paywall; the freely available opening carries the three changes in terms and the characterisation of the volume of litigation.

<span id="ref-2" data-kvalitet="B" data-habilitet="2">B2</span>\[2\] Dexcom, "Dexcom G7 system overview: the most accurate CGM system," updated 17 Dec. 2025. [Online]. Available: https://www.dexcom.com/en-us/all-access/dexcom-cgm-explained/g7-overview. [Accessed: 18 October 2026]. The manufacturer on its own product, hence habilitet 2. Used only for what it says about the receiver being optional.

<span id="ref-3" data-kvalitet="B" data-habilitet="2">B2</span>\[3\] Dexcom, "Hvordan får jeg en Dexcom-mottaker?" (Norwegian support page, nb-NO). [Online]. Available: https://www.dexcom.com/nb-no/faqs/how-do-i-get-dexcom-receiver. [Accessed: 18 October 2026]. The entire answer reads "Vennligst kontakt helsepersonell" (please contact a healthcare professional).

<span id="ref-4" data-kvalitet="B" data-habilitet="2">B2</span>\[4\] S. Whooley, "Dexcom has a Class I CGM receiver recall," *Drug Delivery Business News*, 17 June 2025, updated 24 June 2025. [Online]. Available: https://www.drugdeliverybusiness.com/dexcom-class-i-cgm-receiver-recall/. [Accessed: 18 October 2026]. The statement about the majority comes from a Dexcom spokesperson, quoted in the trade press. Habilitet 2 because the company was speaking in order to limit the scope of the recall, and the statement leans the same way as the claim it carries. No public percentage exists.

<span id="ref-5" data-kvalitet="A" data-habilitet="2">A2</span>\[5\] Dexcom, "Vilkår for bruk" (Norwegian terms of use, nb-NO). [Online]. Available: https://www.dexcom.com/nb-NO/legal/terms-of-use. [Accessed: 19 October 2026]. The primary document for Norwegian users, in the version effective from 25 February 2021. Retrieved through a Norwegian exit node, so the content is not geo-selected for another country. Habilitet 2 because the publisher is a party to the agreement, while also being the only authority on its own wording. Source for the arbitration clause and the class action waiver already being in the agreement in 2021, for the seven day clause in 2.1, for the right to discontinue use, for the country specific sections covering Japan, South Korea, Austria, Switzerland, Germany and Singapore, and for the absence of any mention of Norway.

<span id="ref-6" data-kvalitet="A" data-habilitet="1">A1</span>\[6\] *Herzog v. Superior Court*, California Court of Appeal, Fourth Appellate District, Division One, case D082847, decided 16 May 2024, certified for publication. [Online]. Available: https://law.justia.com/cases/california/court-of-appeal/2024/d082847.html. [Accessed: 19 October 2026]. The primary decision, read in full. Source for there being five actions and not six, for the wrongful death claim being a cause of action within the Herzog case, for the two-to-one outcome with Kelety in the majority and Irion dissenting, and for the reasoning: "Dexcom undid whatever notice it might have provided of the contractual terms by explicitly telling the user that clicking the box constituted authorization for Dexcom to collect and store the user's sensitive, personal health information."

<span id="ref-7" data-kvalitet="A" data-habilitet="1">A1</span>\[7\] Stanford Law School, Securities Class Action Clearinghouse, case page for DexCom, Inc. [Online]. Available: https://securities.stanford.edu/filings-case.html?id=108428. [Accessed: 18 October 2026]. An academic register of securities litigation with no interest in the outcome. Source for the consolidation under lead case 24-CV-01485 and for the dates of the complaints.

<span id="ref-8" data-kvalitet="C" data-habilitet="2">C2</span>\[8\] Gibbs Mura, "Dexcom G7 Sensor Failure Lawsuit." [Online]. Available: https://www.classlawgroup.com/dexcom-g7-sensor-failure-lawsuit. [Accessed: 18 October 2026]. The law firm that filed the two class actions, and therefore a party with a financial interest in the litigation. Used only to confirm that the suits exist and what they concern, not for any assessment of their merits.

<span id="ref-9" data-kvalitet="A" data-habilitet="1">A1</span>\[9\] U.S. Food and Drug Administration, "Dexcom, Inc. Issues Correction for G7 Apps and ONE+ Apps due to a Software Design Error That Does Not Alert Users of Unexpected Sensor Failure." [Online]. Available: https://www.fda.gov/medical-devices/medical-device-recalls-and-early-alerts/continuous-glucose-monitor-apps-correction-dexcom-inc-issues-correction-g7-apps-and-one-apps-due. [Accessed: 18 October 2026]. A regulator with no interest in the outcome. The urgent notice was sent to customers on 24 July 2025, and the agency classified the correction as the most serious type of recall.

<span id="ref-10" data-kvalitet="A" data-habilitet="2">A2</span>\[10\] Dexcom, "Dexcom Reaffirms CGM Benefits for All People With Diabetes and Continues Momentum Toward Earlier Stage Intervention and Preventative Care at ADA 2026," investor relations. [Online]. Available: https://investors.dexcom.com/news/news-details/2026/Dexcom-Reaffirms-CGM-Benefits-for-All-People-With-Diabetes-and-Continues-Momentum-Toward-Earlier-Stage-Intervention-and-Preventative-Care-at-ADA-2026/default.aspx. [Accessed: 18 October 2026]. The company's own announcement of the Stelo app and the Nutrisense acquisition, including the quotation from chief executive Jake Leach.

<span id="ref-11" data-kvalitet="A" data-habilitet="2">A2</span>\[11\] Dexcom, "Dexcom Terms of Use" (en-US), effective 26 January 2023. [Online]. Available: https://www.dexcom.com/en-us/legal/terms-of-use. [Accessed: 19 October 2026]. Used only for the comparison of version dates. The text mentions neither artificial intelligence nor any right to opt out of arbitration.

<span id="ref-12" data-kvalitet="A" data-habilitet="1">A1</span>\[12\] European Parliament and Council, Regulation (EU) 2016/679 (General Data Protection Regulation), Article 7(4) and recital 43. [Online]. Available: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679. [Accessed: 18 October 2026]. The consolidated legal text.

<span id="ref-13" data-kvalitet="B" data-habilitet="2">B2</span>\[13\] Dexcom, "Dexcom's Artificial Intelligence Principles." [Online]. Available: https://www.dexcom.com/en-us/ai-principles. [Accessed: 19 October 2026]. The company on its own use of AI, hence habilitet 2. The page carries neither a date nor a version number. It exists in English only; the nb-NO variant returns 404.

<span id="ref-14" data-kvalitet="A" data-habilitet="2">A2</span>\[14\] Dexcom, "Dexcoms personvernerklæring" (Norwegian privacy policy, nb-NO), last updated October 2025. [Online]. Available: https://www.dexcom.com/nb-NO/legal/privacy-policy. [Accessed: 19 October 2026]. Retrieved through a Norwegian exit node. Source for purposes and legal bases appearing in two separate unordered lists with no mapping between them, and for internal research and development being a purpose with no basis named for it.

<span id="ref-15" data-kvalitet="C" data-habilitet="2">C2</span>\[15\] Y. Varoufakis, *Technofeudalism: What Killed Capitalism*, London: The Bodley Head, 2023. The author is a former finance minister of Greece with a declared political position. Used for the concept and the analysis, not for factual claims about this case.
