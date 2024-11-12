## Inspiration
Many people want to stay in shape, so they really want to go workout to achieve their physique. However, most don't due to the hassle of creating unique workout plans because it could be time consuming and general to a specific body type, resulting in poor outcomes. What if you can build a plan that focuses on ***you***? Specifically, your body type, your schedule, the workouts you want to do and your dietary restrictions? Meet Gain+ where we create the fastest way to make big gains!

## What it does
Gain+ creates a custom workout and meal plan based on what you want to look like in the future (i.e. 12 weeks). You will interact with a personal trainer created with AI to discuss your goal. First, you would load two pictures: one based on what you look like now and another based on what you hope to somewhat achieve after you finish your plan. Then, you'll give answers to any questions your coach has before generating a full workout and meal plan. The workout plan is based on the number of days you want to go to the gym, while the meal plan is for every day. You can also add workouts and meals before finalizing your plan as well.

## How we built it
For our website, we've built the frontend in **React and Tailwind CSS** while **Firebase** provides out backend and database to store chats and users. As for the model creating the workout plans, there's a custom model that was created from a [Kaggle Dataset](https://www.kaggle.com/datasets/trainingdatapro/human-segmentation-dataset) and trained on **Roboflow** that classifies images based on gender, the three main types of bodies (ectomorph, mesomorph and endomorph) and the various subtypes. The best classes for that model is then sent to our chatbot, which was trained and deployed with **Databricks Mosaic AI** and based on **LLaMA 3.1**. 

## Challenges we ran into
Some challenges we ran into were the integration of the frontend, backend, and AI and ML components. This was a quite large and upscaled project where we used a lot of new technologies that we had little to no experience with. For example, there was a huge CORS issue in the final hours of hacking that plagued our project that we tried to solve with some help from the internet, as well as getting help from our mentors, Paul and Sammy.

## Accomplishments that we're proud of
This was Kersh and Mike's first time doing something in Databricks and Ayan's first time using Firebase in a more professional scale. The fact that we actually implemented these technologies into a final project from little to no experience was a big accomplishment for all of us.

## What we learned
We learned a lot throughout this hackathon, like working with external APIs for LLMs and Databricks, gained hands on experience with prompt engineering and finally, adjusting to unexpected roadblocks that we faced throughout this hackathon

## What's next for Gain+
Next steps would definitely be to improve the UI and UX and also implement some new features. Some of them can include a significant focus for people who have bodybuilding or powerlifting meets, which we'll implement through a separate toggle.
