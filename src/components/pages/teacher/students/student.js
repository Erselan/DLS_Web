import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image, Label } from 'semantic-ui-react'
import color from '../../../color'
import dateIconBlue from '../../../../assets/images/icons/calendarBlue.png'
import { useSelector } from 'react-redux'
import PdfIcon from '../../../../assets/images/icons/types/pdf.png'
import BookCover from '../../../../assets/images/icons/bookcover.png'

const Student = () => {
  const files = useSelector(state => state.teacher.resources)
  const [radioButton, setRadioButton] = useState('books')
  const [flag, setFlag] = useState(false)

  return (
    <div style={{ padding: '2rem' }}>
      <div>
        <Link to='/teacher/students'>
          <Label
            style={{
              backgroundColor: color.BACKGROUND,
              color: color.MAIN,
              pointer: 'cursor'
            }}
          >
            <Icon name='chevron left' />
            Back
          </Label>
          <br />
        </Link>
      </div>
      <div>
        <label
          style={{
            fontSize: '34px',
            lineHeight: '51px',
            color: color.TEXT_PRIMARY
          }}
        >
          John Smith
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '40px',
          margin: '1rem 0rem'
        }}
      >
        <div
          style={{
            backgroundColor: '#EBECF2',
            borderRadius: '14px',
            display: 'flex'
          }}
        >
          {flag ? (
            <Fragment>
              <button style={{ ...ButtonStyle }}>Assigments</button>
              <button
                style={{
                  ...ButtonStyle,
                  color: color.TEXT_PRIMARY,
                  backgroundColor: color.FOREGROUND,
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
              >
                Resources
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                style={{
                  ...ButtonStyle,
                  color: color.TEXT_PRIMARY,
                  backgroundColor: color.FOREGROUND,
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
              >
                Assigments
              </button>
              <button style={{ ...ButtonStyle }}>Resources</button>
            </Fragment>
          )}
        </div>
      </div>
      <div>
        {flag ? (
          <div>
            <label
              style={{
                fontSize: '18px',
                lineHeight: '33px',
                color: color.TEXT_PRIMARY
              }}
            >
              Shared Resources
            </label>
            <div>
              <input
                type='radio'
                id='books'
                name='option'
                value='books'
                checked={radioButton === 'books' ? 'checked' : ''}
                onChange={() => setRadioButton('books')}
              />
              <label
                for='books'
                style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: color.TEXT_PRIMARY,
                  marginLeft: '0.5rem',
                  marginRight: '1rem'
                }}
              >
                books
              </label>
              <input
                type='radio'
                id='resources'
                name='option'
                value='resources'
                checked={radioButton === 'resources' ? 'checked' : ''}
                onChange={() => setRadioButton('resources')}
              />
              <label
                for='resources'
                style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: color.TEXT_PRIMARY,
                  marginLeft: '0.5rem'
                }}
              >
                resources
              </label>
            </div>
            {radioButton === 'books' ? (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {[true, false].map(item => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div
                        style={{
                          height: '250px',
                          width: '170px',
                          backgroundColor: '#EBECF2',
                          borderRadius: '20px',
                          padding: '0.5rem'
                        }}
                      >
                        <Image src={BookCover} />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <label
                          style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: color.TEXT_PRIMARY
                          }}
                        >
                          Biology Books
                        </label>
                        <label
                          style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: color.TEXT_SECONDARY
                          }}
                        >
                          Biology
                        </label>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>
                {files.length !== 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      width: '100%',
                      overflow: 'scroll'
                    }}
                  >
                    {files.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '1rem'
                          }}
                        >
                          <div
                            style={{
                              width: '80px',
                              height: '80px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: color.FOREGROUND,
                              cursor: 'pointer'
                            }}
                          >
                            <Image src={PdfIcon} width={25} />
                          </div>
                          <label
                            style={{
                              fontSize: '11px',
                              lineHeight: '17px',
                              fontWeight: 'bold',
                              color: color.TEXT_PRIMARY
                            }}
                          >
                            {item.name}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div>No file to show yet</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <label
              style={{
                fontSize: '18px',
                lineHeight: '33px',
                color: color.TEXT_PRIMARY
              }}
            >
              Recent assigments
            </label>
            <div
              style={{
                backgroundColor: color.FOREGROUND,
                borderRadius: '16px',
                padding: '1rem 2rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: '40%' }}>
                  <label
                    style={{
                      fontSize: '18px',
                      lineHeight: '33px',
                      color: color.TEXT_PRIMARY
                    }}
                  >
                    Assigment Name
                  </label>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '60%'
                  }}
                >
                  <div
                    style={{
                      height: '1.5rem',
                      width: '3rem',
                      borderRadius: '4px',
                      backgroundColor: '#EBECF2',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <label
                      style={{
                        fontSize: '0.7rem',
                        color: color.MAIN
                      }}
                    >
                      Biology
                    </label>
                  </div>
                  <div>
                    <div
                      style={{
                        height: '100%',
                        color: color.TEXT_PRIMARY_LIGHT,
                        display: 'flex',
                        fontSize: '0.9rem',
                        marginBottom: '0.1em',
                        fontWeight: 'bolder',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        style={{ marginRight: '0.5em' }}
                        src={dateIconBlue}
                        width={25}
                      />
                      {'Submitted: Sep 10th, 11:30'}
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label
                      style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: color.TEXT_PRIMARY_LIGHT,
                        marginRight: '1rem'
                      }}
                    >
                      Score
                    </label>
                    <div style={CircularCountStyle}>18</div>
                  </div>
                </div>
              </div>
              {true ? (
                <div>
                  <label
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: color.TEXT_PRIMARY
                    }}
                  >
                    Description
                  </label>
                  <label
                    style={{
                      fontSize: '12px',
                      lineHeight: '14px',
                      fontWeight: 'normal',
                      color: color.TEXT_PRIMARY
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Viverra semper habitasse etiam diam. Non dui
                    sed iaculis non donec urna. Mi, etiam montes,
                    volutpat convallis in amet felis, laoreet. Sapien
                    congue scelerisque et nulla dis. Aliquet augue
                    faucibus habitant et ipsum, et sed nisi. Egestas
                    odio iaculis nisl fermentum a venenatis sed.
                    Lacus, lectus varius sed rutrum. Praesent ac,
                    aliquet arcu, volutpat lacus ut. Odio semper donec
                    urna dui eget vel cras suspendisse nulla. .
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <button
                      style={{
                        ...ButtonStyle,
                        backgroundColor: color.MAIN,
                        color: color.FOREGROUND,
                        padding: '0.5rem 1rem'
                      }}
                    >
                      Go to assigment
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ButtonStyle = {
  color: color.TEXT_SECONDARY,
  backgroundColor: '#EBECF2',
  borderRadius: '14px',
  fontSize: '1rem',
  border: 'none',
  fontWeight: 'bolder',
  padding: '6px 20px',
  outline: 'none'
}

const CircularCountStyle = {
  color: color.MAIN,
  backgroundColor: '#ECF0FF',
  marginRight: '0.5em',
  padding: '0.5em 0.5em 0.5em 0.5em',
  borderRadius: '100%',
  fontSize: '1.5rem'
}

export default Student
