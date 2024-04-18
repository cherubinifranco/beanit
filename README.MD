# Bean It

### Bean It helps send multiple emails easily

Designed to send emails based on an Excel file (XLSX), Bean It comes with 4 message presets, the ability to use variables based on the columns of the file, and fixed variables set in the configuration window.

Currently, it only supports sending mails from Gmail addresses.

All information is stored only on your computer. Bean It doesn't store any data.

# Contents

- [Configuration](#configuration)
  - [Mail](#mail-configuration)
  - [Variables](#loading-variables)
  - [Message](#message-composition)
- [Sending Emails](#sending-emails)
- [Types of Errors](#types-of-errors)
- [Contact Information](#contact-information)

# Configuration

To send emails for the first time, you need to perform 3 steps:

- Configure the email address for sending.
- Select an XLSX file.
- Compose a message.

## Mail Configuration

In the configuration window, you need to enter both the email address and the application password. This password is different from the one used to log into the email account.

For more information (https://support.google.com/accounts/answer/185833?hl=en)

## Selection of XLSX File

In the main window, you can select an XLSX file. This loads the file's address and triggers the [loading of variables](#loading-variables).

## Loading Variables

There are 2 types of variables in this program. [Fixed Variables](#fixed-variables) are generated manually and have prioriry over [Dynamic Variables](#dynamic-variables). This means that if variables are repeated, the Fixed Variable will be used.

To use variables in the [Message Composition](#message-composition), they must be enclosed in curly braces {}.

### Fixed Variables

In the configuration window, you can generate variables that apply both in the display and when sending emails. First, give it a name and add it. If there isn't a variable with that name, it is added to the list, and a value can be assigned.

### Dynamic Variables

These variables are generated after the selection of the XLSX file.

The first row of the file is loaded as the variable names, and the second row as their example values.

|     | A        | B             | C                | D           | E            |
| --- | -------- | ------------- | ---------------- | ----------- | ------------ |
| 1   | **Name** | **Last Name** | **Phone Number** | **Payment** | **Email**    |
| 2   | Dante    | Gonzales      | 321-155-455      | 3100        | ej1@test.com |
| 3   | Tomas    | Bargo         | 342-155-544      | 1700        | ej2@test.com |

In this case, the following Dynamic Variables are generated:

    Name: "Dante"
    Last Name: "Gonzales"
    Phone Number: 321-155-455
    Payment: 3100

# Message Composition

In this section, compose the content of the email to be sent. This is also the time to use both [Fixed Variables](#fixed-variables) and [Dynamic Variables](#dinamic-variables).

Using the example above:

    Hi {Name} {Last Name}, this month your payment is a total of {Payment}

What ej1@test.com receives:

     Hi Dante Gonzales, this month your payment is a total of 3100

What ej2@test.com receives:

     Hi Tomas Bargo, this month your payment is a total of 1700

# Sending Emails

Email addresses are automatically detected. It is assumed that there is a cell with one of the following names:
[Mail , mail, Email, email, Correo, correo]

If there is no column with one of those names, it returns to the error section as "Mail not defined."

The daily sending limit is approximately 400 emails. This limit is imposed by Google.

# Types of Errors

#### Mail not Defined

The cell under the designated email address column was empty.

#### Email Error

An email address was identified, but an error occurred while sending it. This indicates that the email was sent, but the email service could not find the target address. We recommend verifying the address, as a typo may have occurred.

# Contact Information

If you want to send any feedback about the application or a suggestion, you can do so through the program itself if you have configured the email.

Or through one of the following means:

- [Email](cherubini.franco@hotmail.com)
- [LinkedIn](www.linkedin.com/in/cherubinifranco/)


# Future of Bean It
While this is a simple project for learning, I intend to expand it further.

### The following features are planned for implementation:

- Automatic updates
- Drag & drop of files and images.
- Better ticket management
