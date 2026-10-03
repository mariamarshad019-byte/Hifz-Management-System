# Hifz Management System — Database Documentation

## 1. Database Overview

The Hifz Management System uses **Supabase PostgreSQL** as its backend database.

Supabase provides a centralized location for storing and retrieving application data.

The database is used to support features such as:

* User authentication
* Hifz progress
* Daily Hifz plans
* Achievements
* User-related information
* Other application data as the system is developed

## 2. Database Technology

The project uses:

* Supabase
* PostgreSQL
* Supabase JavaScript Client
* Row Level Security (RLS)

The React frontend communicates with Supabase through the Supabase JavaScript client.

## 3. Database Architecture

The basic database flow is:

```text
React Application
       ↓
Supabase JavaScript Client
       ↓
Supabase
       ↓
PostgreSQL Database
```

## 4. Hifz Progress

The Hifz progress data is stored in the `hifz_progress` table.

The table is used to record the student's memorization progress.

### Main Fields

| Field             | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `id`              | Unique identifier for the progress record   |
| `juz_number`      | Juz number associated with the memorization |
| `surah_name`      | Name of the Surah                           |
| `ayahs_memorized` | Number of Ayahs memorized                   |
| `total            |                                             |
