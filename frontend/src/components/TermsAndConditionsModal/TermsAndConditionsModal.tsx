import React, { useState } from 'react'
import { 
  Stack, 
  Dialog, 
  DialogFooter, 
  DialogType, 
  PrimaryButton, 
  Checkbox, 
  Text,
  DefaultButton 
} from '@fluentui/react'
import { Icon } from '@fluentui/react/lib/Icon'

interface TermsAndConditionsModalProps {
  hidden: boolean
  onSubmit: () => void
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ hidden, onSubmit }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false)

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Terms and Conditions and Privacy Notice'
  }

  const modalProps = {
    isBlocking: true
  }

  const handleCheckboxChange: (
    event?: React.FormEvent<HTMLElement | HTMLInputElement>, 
    checked?: boolean
  ) => void = (_, checked) => {
    setIsChecked(!!checked)
  }

  const points = [
    { text: 'I provide general People Team (previously known as HR) information and guidance.', iconName: 'CheckMark' },
    { text: 'I don’t replace People Team professionals or give legal advice.', iconName: 'Cancel' },
        {
      text: 'I am unable to provide any individualised responses as I don’t have access to any systems containing your personal data, i.e. Oracle Fusion.',
      iconName: 'Cancel'
    },
    {
      text: 'Your chats are confidential and anonymised, but will be stored and analysed, so please avoid sharing any data of a sensitive and personal nature.',
      iconName: 'Lock'
    },
    {
      text: 'Anonymised feedback you provide about my responses on the chat interface will be used to improve the accuracy and appropriateness of my responses.',
      iconName: 'Feedback'
    },
    {
      text: 'For complex issues, please consult the People team directly.',
      iconName: 'Phone'
    },
    {
      text: (
        <>
          We would love your feedback! Please either rate my responses through the chat interface, or you can reach out to the Engineering Team at
          <a href="mailto:engineering-ai@mhra.gov.uk">engineering-ai@mhra.gov.uk</a>with your comments.
        </>
      ),
      iconName: 'Mail'
    }
  ]

  return (
    <Dialog
      hidden={hidden}
      onDismiss={onSubmit}
      modalProps={modalProps}
      dialogContentProps={dialogContentProps}
      minWidth={600}>
      <div id="welcome-message">
        <Text>
          Welcome to the MHRA People Chatbot!
          <span>
            {' '}
            <Icon iconName={'Robot'} styles={{ root: { fontSize: 16, color: '#0078D4' } }} />
          </span>
        </Text>
      </div>
      <br />
      <div>
        <Stack tokens={{ childrenGap: 10 }}>
          {points.map((point, index) => (
            <Stack horizontal verticalAlign="center" key={index} tokens={{ childrenGap: 10 }} id={`terms-point-${index}`}>
              <Icon iconName={point.iconName} styles={{ root: { fontSize: 16, color: '#0078D4' } }} />
              <Text>{point.text}</Text>
            </Stack>
          ))}
        </Stack>
      </div>

      {/* Collapsible Privacy Notice */}
      <br />
      <DefaultButton
        text={showPrivacyNotice ? 'Hide Privacy Notice' : 'Show Privacy Notice'}
        onClick={() => setShowPrivacyNotice(!showPrivacyNotice)}
        iconProps={{ iconName: showPrivacyNotice ? 'ChevronUp' : 'ChevronDown' }}
      />
      {showPrivacyNotice && (
        <div style={{ marginTop: 10, padding: '10px', border: '1px solid #ccc', borderRadius: 4 }}>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
            Privacy Notice
          </Text>
          <ul style={{ marginTop: 8 }}>
            <li>The only personal information we collect are your user queries, so please do not volunteer personal information.</li>
            <li>Each conversation is anonymised. So unless you voluntarily offer personal information that can be traced back to you, we will not be able to link a conversation to an individual.</li>
            <li>Data is retained for X days.</li>
            <li>Purpose of data collection and processing: answering your People Team queries and performing analysis on your queries to understand what kind of queries are being.</li>
            <li>The legal basis for processing your data is for legitimate interests.</li>
            <li>Your data is retained internally and not shared externally with any third parties.</li>
            <li>
              For more details, see the  
              <a href="https://insite/wp-content/uploads/2019/03/Privacy-notice-employees.pdf" target="_blank" rel="noopener noreferrer">
                MHRA internal privacy notice for staff
              </a>
              .
            </li>
          </ul>
        </div>
      )}

      <br />
      <Checkbox id="terms-checkbox" label="I agree to the terms and conditions" checked={isChecked} onChange={handleCheckboxChange} />
      <DialogFooter data-testid="dialog-footer">
        <PrimaryButton id="submit-button" onClick={onSubmit} text="Submit" disabled={!isChecked} />
      </DialogFooter>
    </Dialog>
  )
}

export default TermsAndConditionsModal
